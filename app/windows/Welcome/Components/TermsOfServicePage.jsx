import React from 'react'
import styled from 'styled-components'
import ToS from './ToS'
import { shell } from 'electron'

import {
  Window,
  Content,
  Toolbar,
  Actionbar,
  Button,
  CheckBox
} from 'react-photonkit'

const StyledContent = styled.div`
  h1:first-child {
    margin-top: 0px;
  }
`

const TermsSection = styled.section`
  background: white;
  height: calc(100vh - 250px);
  overflow: auto;
  padding: 0px 10px;
`

const ToSLink = <a onClick={() => shell.openExternal('https://siderus.io/tos.html')} href='#'>Siderus Terms of Service</a>
const PrivacyLink = <a onClick={() => shell.openExternal('https://siderus.io/privacy')} href='#'>Privacy policy</a>
const checkboxLabel = <span>I have read and I agree to {ToSLink} and {PrivacyLink}</span>

class TermsOfServicePage extends React.Component {
  state = {
    checked: false
  }

  handleCheckChange = () => {
    this.setState(prevState => ({ checked: !prevState.checked }))
  }

  handleSubmit = (event) => {
    event.preventDefault()
    if (!this.state.checked) return

    this.props.onAccept()
  }

  render () {
    const { onQuit } = this.props
    const { checked } = this.state

    return (
      <form onSubmit={this.handleSubmit}>
        <Window>
          <Content>
            <StyledContent>
              <h1>Terms of Service</h1>
              <p>In order to continue, you need to accept the Terms of Service:</p>
              <TermsSection>
                <ToS />
              </TermsSection>
              <CheckBox
                label={checkboxLabel}
                checked={checked}
                onChange={this.handleCheckChange}
              />
            </StyledContent>
          </Content>
          <Toolbar ptType="footer">
            <Actionbar>
              <Button text="Quit" ptStyle="default" onClick={onQuit} />
              {
                checked &&
                <Button
                  text="Done"
                  ptStyle="primary"
                  type="submit"
                  pullRight
                />
              }
            </Actionbar>
          </Toolbar>
        </Window>
      </form>
    )
  }
}

export default TermsOfServicePage