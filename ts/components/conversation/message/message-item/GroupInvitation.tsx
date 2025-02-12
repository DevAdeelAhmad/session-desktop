import classNames from 'classnames';
import React from 'react';
import styled from 'styled-components';

import { acceptOpenGroupInvitation } from '../../../../interactions/messageInteractions';
import { PropsForGroupInvitation } from '../../../../state/ducks/conversations';
import { SessionIconButton } from '../../../icon';
import { ReadableMessage } from './ReadableMessage';

const StyledIconContainer = styled.div`
  background-color: var(--message-link-preview-background-color);
  border-radius: 100%;
`;

export const GroupInvitation = (props: PropsForGroupInvitation) => {
  const { messageId, receivedAt, isUnread } = props;
  const classes = ['group-invitation'];

  if (props.direction === 'outgoing') {
    classes.push('invitation-outgoing');
  }
  const openGroupInvitation = window.i18n('openGroupInvitation');

  return (
    <ReadableMessage
      messageId={messageId}
      receivedAt={receivedAt}
      isUnread={isUnread}
      key={`readable-message-${messageId}`}
    >
      <div className="group-invitation-container" id={`msg-${props.messageId}`}>
        <div className={classNames(classes)}>
          <div className="contents">
            <StyledIconContainer>
              <SessionIconButton
                iconColor={
                  props.direction === 'outgoing'
                    ? 'var(--message-bubbles-sent-text-color)'
                    : 'var(--message-bubbles-received-text-color)'
                }
                iconType={props.direction === 'outgoing' ? 'communities' : 'plus'}
                iconSize={'large'}
                onClick={() => {
                  acceptOpenGroupInvitation(props.acceptUrl, props.serverName);
                }}
              />
            </StyledIconContainer>
            <span className="group-details">
              <span className="group-name">{props.serverName}</span>
              <span className="group-type">{openGroupInvitation}</span>
              <span className="group-address">{props.url}</span>
            </span>
          </div>
        </div>
      </div>
    </ReadableMessage>
  );
};
