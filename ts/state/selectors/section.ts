import { createSelector } from '@reduxjs/toolkit';

import { StateType } from '../reducer';
import { OverlayMode, SectionStateType, SectionType } from '../ducks/section';
import { SessionSettingCategory } from '../../components/settings/SessionSettings';

export const getSection = (state: StateType): SectionStateType => state.section;

export const getFocusedSection = createSelector(
  getSection,
  (state: SectionStateType): SectionType => state.focusedSection
);

export const getIsMessageSection = (state: StateType) => {
  return state.section.focusedSection === SectionType.Message;
};

export const getFocusedSettingsSection = createSelector(
  getSection,
  (state: SectionStateType): SessionSettingCategory | undefined => state.focusedSettingsSection
);

export const getIsAppFocused = createSelector(
  getSection,
  (state: SectionStateType): boolean => state.isAppFocused
);

export const getOverlayMode = createSelector(
  getSection,
  (state: SectionStateType): OverlayMode | undefined => state.overlayMode
);

export const getIsMessageRequestOverlayShown = (state: StateType) => {
  const focusedSection = getFocusedSection(state);
  const overlayMode = getOverlayMode(state);

  return focusedSection === SectionType.Message && overlayMode === 'message-requests';
};
