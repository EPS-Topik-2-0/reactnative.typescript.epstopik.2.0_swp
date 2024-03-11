export type iLayoutProps = {
  typeScreenSchedule?: boolean;

  handleLeftBack?: () => void;
  handleLeftBackLabel?: string;

  handleRightNotification?: () => void;
  handleLeftMenus?: () => void;

  centerTitle?: string;

  resultTitle?: string;
  resultSubTitle?: string;

  handleRightRegister?: () => void;
  handleRightRegisterLabel?: () => string;

  loading?: boolean;
  loadingAppBar?: boolean;

  labelLoading?:string;
  backgroundMainColor?:boolean;

};
