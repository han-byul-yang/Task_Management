const noticeMessage = () => {
  const messages = {
    board: {
      WILL_DELETE: '해당 보드를 삭제하시겠습니까?',
    },
    card: {
      WILL_DELETE: '해당 카드를 삭제하시겠습니까?',
    },
  }

  return messages
}

export default noticeMessage
