import { Button, ExternalLink } from '@newrelic/gatsby-theme-newrelic';
import { DEMO_LINK, SIGNUP_LINK } from '../data/constants';
import PropTypes from 'prop-types';
import React from 'react';
import { css } from '@emotion/react';
import DoubleUnderlineSVG from './Icons/DoubleUnderlineSVG';

const MOBILE_BREAKPOINT = '800px';

const GetStartedFooter = ({ style = 'PRIMARY', ...props }) => {
  return (
    <div
      css={css`
        --nr1--color--accent: #1ce783;
        --nr1--color--text--primary: #293338;

        --nr1--color--background--button--primary--enabled: #293338;
        --nr1--color--background--button--primary--hover: #000;
        --nr1--color--text--buttton--primary: #1ce783;

        --nr1--color--background--button--primary-accent--enabled: #1CE78;
        --nr1--color--background--button--primary-accent--hover: #00ce7c;
        --nr1--color--text--buttton--primary-accent: #000;

        width: 100%;
        height: 7rem;

        display: flex;
        justify-content: center;
        align-items: center;

        font-size: 33px;

        background-color: var(--nr1--color--accent);

        > h3 {
          color: var(--nr1--color--text--primary);

          font-family: Söhne-Buch;
          font-size: 44px;
          line-height: 50px;
          letter: -1.5%;
        }

        @media screen and (max-width: ${MOBILE_BREAKPOINT}) {
          padding: 4rem 2.5rem 4rem 2.5rem;
          height: 425px;
          flex-direction: column;

          > h3 {
            width: 296px;
            font-size: 36px;
            line-height: 2.875rem;
            line-spacing: -0.015em;
            margin-bottom: 3.375rem;
            font-size: 2.75rem;
            letter-spacing: -0.015em;
          }

          .Underline {
            left: 0;
            top: 100%;
            position: absolute;
            width: 100%;
          }
        }

        @media screen and (min-width: ${MOBILE_BREAKPOINT}) {
          h3 {
            padding-right: 180px;
          }
          .Underline {
            position: absolute;
            right: 0;
            width: 100%;
            display: block;
          }
        }
      `}
    >
      <h3
        css={css`
          margin-bottom: 0px;
        `}
      >
        Get started today&nbsp;
        <span
          css={css`
            white-space: nowrap;
            position: relative;
          `}
        >
          for free.
          <DoubleUnderlineSVG className="Underline" />
        </span>
      </h3>
      <div
        css={css`
          display: flex;
          justify-content: flex-start;

          > a {
            font-size: 18px;
            font-weight: 400;
            line-height: 24px;

            width: 142px;
            height: 64px;

            :first-of-type {
              margin: 0px 8px;
            }
          }

          @media screen and (max-width: ${MOBILE_BREAKPOINT}) {
            height: 315px;
            flex-direction: column;

            > a {
              width: 296px;
              height: 64px;

              :first-of-type {
                margin: 8px 0px;
              }
            }
          }
        `}
      >
        <Button
          {...props}
          as={ExternalLink}
          variant={Button.VARIANT.PRIMARY}
          href={SIGNUP_LINK}
          className="btn-styles btn1"
          css={css`
            --button-background: var(
              ${style === 'PRIMARY'
                ? '--btn-background-green'
                : '--brand-secondary-background-color'}
            );
            --button-text-color: var(
              ${style === 'PRIMARY'
                ? '--brand-primary-text-color'
                : '--brand-secondary-text-color'}
            );
            background-color: var(--background-color);
            color: var(--nr1--color--text--buttton--primary);
            border-radius: 4px;
            font-size: 14px;
            line-height: 21px;
            font-weight: 400;
            padding: 1rem;
            &:hover {
              background-color: var(--background-color);
              color: var(--nr1--color--text--buttton--primary);
            }
            .scroll {
              margin-top: -1px;
            }
          `}
        >
          <div className="btn-animation-styles">
            <div className="scroll scroll-top">Sign Up</div>
            <div className="scroll scroll-bottom">Sign Up</div>
          </div>
        </Button>
        <Button
          {...props}
          as={ExternalLink}
          variant={Button.VARIANT.PRIMARY}
          href={DEMO_LINK}
          className="btn-styles btn1"
          css={css`
            --button-background: var(
              ${style === 'PRIMARY'
                ? '--btn-background-green'
                : '--brand-secondary-background-color'}
            );
            --button-text-color: var(
              ${style === 'PRIMARY'
                ? '--brand-primary-text-color'
                : '--brand-secondary-text-color'}
            );
            background-color: var(--btn-background-green);
            color: var(--nr1--color--text--buttton--primary-accent);
            border: 1px solid var(--nr1--color--text--buttton--primary-accent);
            border-radius: 4px;
            font-size: 14px;
            line-height: 21px;
            font-weight: 400;
            padding: 1rem;

            &:hover {
              background-color: var(--btn-background-green);
              color: var(--nr1--color--text--buttton--primary-accent);
            }
            &:focus {
              outline: none;
              text-decoration-line: none !important;
            }
            .scroll {
              margin-top: -1px;
            }
          `}
        >
          <div className="btn-animation-styles">
            <div className="scroll scroll-top">Get Demo</div>
            <div className="scroll scroll-bottom">Get Demo</div>
          </div>
        </Button>
      </div>
    </div>
  );
};

GetStartedFooter.propTypes = {
  style: PropTypes.string,
};

export default GetStartedFooter;
