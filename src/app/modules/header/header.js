import React, { Component, Fragment } from "react";
import styles from "./header.module.scss";
import profilePic from "Images/profile-pic.jpeg";
import { landingPageBody } from "../../constants/landingConstants";
import Div from "Common/components/div";
import { Spring, Transition, config } from "react-spring/renderprops";
import HeaderDescription from './headerDescription';
import backgroundDarkDoodle from 'Images/background-dark-doodle.jpg';

class Header extends Component {
  state = {
    isFullScreen: true,
    showDescription: true
  };

  showFullScreen = () => {
    // from header to full screen
    this.setState({
      isFullScreen: true
    });

    setTimeout(() => {
      this.setState({
        showDescription: true
      });
    }, 800);
  };

  hideFullScreen = () => {
    this.setState({ showDescription: false });

    setTimeout(() => {
      this.setState({
        isFullScreen: false
      });
    }, 500);
  };

  onClickProfilePic = () => {
    const { isFullScreen } = this.state;

    if (!isFullScreen)
      this.showFullScreen();
  };

  onClickProject = () => {
    const { isFullScreen } = this.state;
    const { updateBodyType } = this.props;

    if (isFullScreen) {
      setTimeout(() => {
        updateBodyType(landingPageBody.PROJECT);
      }, 600);
    } else updateBodyType(landingPageBody.PROJECT);

    if (isFullScreen) this.hideFullScreen();
  };

  onClickTimeline = () => {
    const { isFullScreen } = this.state;
    const { updateBodyType } = this.props;

    if (isFullScreen) {
      setTimeout(() => {
        updateBodyType(landingPageBody.TIMELINE);
      }, 600);
    } else updateBodyType(landingPageBody.TIMELINE);

    if (isFullScreen) this.hideFullScreen();
  };

  render() {
    const { isFullScreen, showDescription } = this.state;

    return (
      <Spring
        to={{
          backgroundColor: isFullScreen ? '#333333ff' : '#33333300',
          height: isFullScreen ? 'calc(100vh + 0px)' : 'calc(0vh + 70px)', //Because have to keep a same format even the operator and type of units
        }}
      >
        {
          props => (
            <div
              style={{
                backgroundColor: props.backgroundColor,
                height: props.height,
              }}
              className={`${
                isFullScreen ? styles.header_fullscreen : styles.header_normal
                } ${styles.header_container}`}
            >
              <Transition
                items={showDescription}
                from={{ opacity: 0}}
                enter={{ opacity: 1}}
                leave={{ opacity: 0}}
              >
                {
                  value => value && (props => (
                    <div style={{
                      backgroundImage: `url(${backgroundDarkDoodle})`,
                      ...props,
                    }} className={styles.background_gradient}
                    ></div>
                  ))
                }
              </Transition>

              <Div row className={`${styles.header_link_container}`}>
                <div
                  className={styles.header_link_button}
                  onClick={this.onClickTimeline}
                >
                  Timeline
              </div>
                <div
                  className={styles.header_link_button}
                  onClick={this.onClickProject}
                >
                  Projects
              </div>
              </Div>


              <Div align className={styles.content_container}>

                <img
                  src={profilePic}
                  className={styles.user_pic}
                  onClick={this.onClickProfilePic}
                />

                <HeaderDescription
                  showDescription={showDescription}
                  onClickProject={this.onClickProject}
                  onClickTimeline={this.onClickTimeline}
                />
              </Div>
            </div>
          )
        }
      </Spring>
    );
  }
}

export default Header;
