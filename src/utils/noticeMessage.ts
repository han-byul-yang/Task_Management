const noticeMessage = () => {
  const messages = {
    board: {
      WILL_DELETE: { kind: 'notification', message: '해당 보드를 삭제하시겠습니까?' },
      SAME_NAME_BOARD: { kind: 'error', message: '같은 이름의 보드가 존재합니다.' },
    },
    card: {
      WILL_DELETE: { kind: 'notification', message: '해당 카드를 삭제하시겠습니까?' },
    },
  }

  return messages
}

export default noticeMessage
