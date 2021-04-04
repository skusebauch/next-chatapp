import styled from 'styled-components'

export const Header = styled.div`
  position: sticky;
  width: 100%;
  top: 0;
  background-color: white;
  z-index: 5;
  display: flex;
  padding: 11px;
  height: 80px;
  align-items: center;
  border-bottom: 1px solid whitesmoke;
`

export const HeaderInfo = styled.div`
  margin-left: 15px;
  flex: 1;
  > h3 {
    margin-bottom: 3px;
  }
  > p {
    font-size: 12px;
    color: gray;
  }
`

export const HeaderIcons = styled.div``

export const MessageContainer = styled.div`
  padding: 30px;
  background-color: #e5ded8;
  overflow: scroll;
  height: calc(
    ${typeof window !== 'undefined' ? window.innerHeight * 0.01 * 100 : null}px -
      80px - 78px
  );
`
export const BeginningOfMessage = styled.div`
  margin-top: 75px;
`
export const EndOfMessage = styled.div`
  margin-bottom: 50px;
`
export const InputContainer = styled.form`
  display: flex;
  align-items: center;
  padding: 10px;
  position: sticky;
  width: 100%;
  bottom: 0;
  background-color: white;
  z-index: 10;
`
export const Input = styled.input`
  flex: 1;
  outline: 0;
  border: none;
  border-radius: 10px;
  background-color: whitesmoke;
  padding: 20px;
  margin: 0 15px;
`
