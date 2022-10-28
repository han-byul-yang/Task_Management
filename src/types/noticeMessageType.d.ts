export interface INoticeMessage {
  messageInformation: { kind: string; message: string }
  noticeMessageOkButtonHandle?: MouseEventHandler<HTMLButtonElement>
}
