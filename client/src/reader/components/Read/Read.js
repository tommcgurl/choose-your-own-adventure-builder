import React, { useEffect, useRef, useState } from 'react';
import { IoIosArrowBack, IoMdMenu } from 'react-icons/io';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { animated, useSpring, useTransition } from 'react-spring';
import {
  Button,
  BUTTON_VARIANTS,
  closeModal,
  MODAL_SIZES,
  popModal,
} from '../../../shared/components';
import * as routes from '../../constants/routes';
import {
  addBreadcrumb,
  addToLibrary,
  removeBreadcrumb,
} from '../../store/actions/libraryActions';
import {
  adventureSelector,
  currentBreadcrumbSelector,
} from '../../store/selectors';
import progressSelector from '../../store/selectors/progressSelector';
import Options from '../Options';
import styles from './Read.module.css';

function createBreadcrumb(currentBreadcrumb, choice) {
  return {
    ...currentBreadcrumb,
    storyPartKey: choice.nextBranch || choice.consequence.nextBranch, // TODO: clean up how we structure storyparts
  };
}

const Page = ({
  adventure,
  currentBreadcrumb,
  forwardedRef,
  setLoadingPage,
  setShowMenu,
}) => {
  const transitions = useTransition(currentBreadcrumb.storyPartKey, p => p, {
    from: {
      opacity: 0,
      position: 'absolute',
      transform: 'translate(0, 100vh)',
    },
    enter: { opacity: 1, position: 'static', transform: 'translate(0, 0vh)' },
    leave: {
      opacity: 0,
      position: 'absolute',
      transform: 'translate(0, -100vh)',
    },
    onRest: () => {
      setLoadingPage(false);
    },
  });

  function handleClick() {
    if (!window.matchMedia('only screen and (min-width: 768px)').matches) {
      setShowMenu(value => !value);
    }
  }

  return (
    <React.Fragment>
      {transitions.map(({ item, props: style, key }) => {
        const plotHtml = adventure.storyParts[item].plot;
        return (
          <animated.div
            key={key}
            className={styles.page}
            style={style}
            dangerouslySetInnerHTML={{
              __html: plotHtml,
            }}
            ref={forwardedRef}
            onClick={handleClick}
          />
        );
      })}
    </React.Fragment>
  );
};

const Prompt = ({ prompt, onChoiceClick }) => {
  return (
    <ul className={styles.choiceList}>
      {prompt.choices.map(choice => (
        <li key={choice.text} className={styles.liChoice}>
          <Button
            style={{ width: '100%' }}
            onClick={() => onChoiceClick(choice)}
          >
            {choice.text}
          </Button>
        </li>
      ))}
    </ul>
  );
};

const Read = ({
  adventure,
  breadcrumb: currentBreadcrumb,
  match,
  addBreadcrumb,
  removeBreadcrumb,
  addToLibrary,
  progress,
  history,
}) => {
  const [showMenu, setShowMenu] = useState(false);
  const [showPromptButton, setShowPromptButton] = useState(false);
  const [loadingPage, setLoadingPage] = useState(true);

  const promptButtonSpringStyles = useSpring({
    opacity: showPromptButton ? 1 : 0,
  });

  const transitions = useTransition(showMenu, null, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
  });

  const pageRef = useRef(null);

  useEffect(() => {
    function showHidePromptButton() {
      if (
        window.innerHeight + document.documentElement.scrollTop >=
          pageRef.current.offsetHeight &&
        !showPromptButton &&
        !loadingPage
      ) {
        setShowPromptButton(true);
      } else if (
        window.innerHeight + document.documentElement.scrollTop <
          pageRef.current.offsetHeight &&
        showPromptButton
      ) {
        setShowPromptButton(false);
      }
    }

    function handleScroll() {
      showHidePromptButton();
    }

    showHidePromptButton();

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  });

  const { prompt } = adventure.storyParts[currentBreadcrumb.storyPartKey];

  function handleChoiceClick(choice) {
    closeModal();
    setLoadingPage(true);
    setShowPromptButton(false);
    window.scrollTo(0, 0);
    const breadcrumb = createBreadcrumb(currentBreadcrumb, choice);
    if (adventure.storyParts[breadcrumb.storyPartKey]) {
      addBreadcrumb(adventure.id, breadcrumb);
    } else {
      // TODO: This should never get hit once we start validating that published stories always have connected parts
      throw new Error(
        `Tried to travel to nonexistant story part: ${breadcrumb.storyPartKey}`
      );
    }
  }

  function toggleMenu() {
    setShowMenu(value => !value);
  }

  function handleGoBackClick() {
    removeBreadcrumb(adventure.id);
  }

  function handleStartOverClick() {
    addToLibrary(adventure);
  }

  function handleBackButtonClick() {
    history.push(routes.COVER.replace(':adventureId', adventure.id));
  }

  function handlePromptButtonClick() {
    popModal(<Prompt prompt={prompt} onChoiceClick={handleChoiceClick} />, {
      size: MODAL_SIZES.LARGE,
      title: prompt.text,
    });
  }

  return adventure && currentBreadcrumb && Array.isArray(progress) ? (
    <div className={styles.container}>
      <div className={styles.menuContainer}>
        <Button variant={BUTTON_VARIANTS.ICON} onClick={handleBackButtonClick}>
          <IoIosArrowBack style={{ width: '100%', height: '100%' }} />
        </Button>
        <span className={styles.title}>{adventure.title}</span>
        {transitions.map(
          ({ item, props, key }) =>
            item && (
              <animated.div
                key={key}
                style={{
                  ...props,
                  position: 'absolute',
                  right: 62,
                  backgroundColor: 'var(--color-background)',
                }}
              >
                <Options />
              </animated.div>
            )
        )}
        <div>
          <Button
            id="menuButton"
            className={styles.menuButton}
            variant={BUTTON_VARIANTS.ICON}
            onClick={toggleMenu}
          >
            <IoMdMenu style={{ width: '100%', height: '100%' }} />
          </Button>
        </div>
      </div>
      <Page
        forwardedRef={pageRef}
        adventure={adventure}
        currentBreadcrumb={currentBreadcrumb}
        setLoadingPage={setLoadingPage}
        setShowMenu={setShowMenu}
      />
      <animated.div
        className={styles.promptButton}
        style={promptButtonSpringStyles}
      >
        {prompt ? (
          <Button
            variant={BUTTON_VARIANTS.BORDERLESS}
            onClick={handlePromptButtonClick}
          >
            {prompt.text}
          </Button>
        ) : (
          <React.Fragment>
            <Button onClick={handleGoBackClick}>Go back</Button>
            <Button
              variant={BUTTON_VARIANTS.DESTRUCTIVE}
              onClick={handleStartOverClick}
            >
              Start Over
            </Button>
          </React.Fragment>
        )}
      </animated.div>
      {transitions.map(
        ({ item, props, key }) =>
          item && (
            <animated.div key={key} style={props}>
              <div
                className={styles.mobileMenuContainer}
                style={{ width: '100%' }}
              >
                <Button
                  variant={BUTTON_VARIANTS.ICON}
                  onClick={handleBackButtonClick}
                >
                  <IoIosArrowBack style={{ width: '100%', height: '100%' }} />
                </Button>
                <span className={styles.title}>{adventure.title}</span>
              </div>
              <div className={styles.optionsContainer}>
                <Options />
              </div>
            </animated.div>
          )
      )}
    </div>
  ) : match && match.params && match.params.adventureId ? (
    <Redirect
      to={routes.COVER.replace(':adventureId', match.params.adventureId)}
    />
  ) : (
    <Redirect to={routes.NOT_FOUND} />
  );
};

const mapStateToProps = (state, { match }) => {
  return (
    match &&
    match.params &&
    match.params.adventureId && {
      adventure: adventureSelector(state)(match.params.adventureId),
      breadcrumb: currentBreadcrumbSelector(state)(match.params.adventureId),
      progress: progressSelector(state)(match.params.adventureId),
    }
  );
};

export default connect(
  mapStateToProps,
  {
    addBreadcrumb,
    removeBreadcrumb,
    addToLibrary,
  }
)(Read);
