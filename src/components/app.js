import React from 'react';
import ReactDOM from 'react-dom';
import { Component } from 'react';
import Highlight from 'react-highlight';
import Clipboard from 'clipboard';



class GuideWrapper extends Component {
  contents() {
    const list = [];
    this.props.children.forEach((node) => {
      if(node.type === "h4") {
        console.log(node.props.id)
        list.push(<li key={ node.props.id }><a href={`#${ node.props.id }`}>{ node.props.children }</a></li>)
      }
    });

    return list;
  }

  render() {
    return(
      <div className="container">
        <ul>
          { this.contents() }
        </ul>
        { this.props.children }
        }
      </div>
    )
  }
}

export default class App extends Component {
  afterGenerate() {
    return`# app/mailers/application_mailer.rb
class ApplicationMailer < ActionMailer::Base
  default from: "from@example.com"
  layout 'mailer'
end

# app/mailers/user_mailer.rb
class UserMailer < ApplicationMailer
end`
  }

  welcomeEmail() {
    return`def welcome_email(user)
  @user = user
  @url  = 'http://example.com/login'
  mail(to: @user.email, subject: 'Welcome to My Awesome Site')
end`
  }

  render() {
    const clipboard = new Clipboard('.copy-button');

    clipboard.on("success", (e) => {
      e.trigger.innerHTML = "Copied it!"
      console.log("Copied it!")
    });

    clipboard.on('error', (e) => {
        console.log(e);
    });

    return (
      <GuideWrapper>
        <h2>Rails - Action Mailer <span className="sub-header">Setup Welcome Email</span></h2>
        <h4 id="generate-mailer">1. Generate New Mailer</h4>
        <a href="#" className="copy-button" data-clipboard-target="#gen-mailer">
          Copy Snippet
        </a>
        <div id="gen-mailer">
          <Highlight className="ruby">
            {`rails g mailer UserMailer`}
          </Highlight>
        </div>

        <h5>After running the generator you'll have:</h5>
        <Highlight className="ruby">
          { this.afterGenerate() }
        </Highlight>
        <h4 id="update-mailer">2. Update New Mailer</h4>
        <p>Add the default from and email method to new mailer class.</p>
        <h5>Add the default from</h5>
        <a href="#" className="copy-button" data-clipboard-target="#default-from">
          Copy Snippet
        </a>
        <div id="default-from">
          <Highlight className="ruby">
            { `default from: 'notifications@example.com'` }
          </Highlight>
        </div>
        <h5>Add method for sending welcome emails</h5>
        <a href="#" className="copy-button" data-clipboard-target="#welcome-method">
          Copy Snippet
        </a>
        <div id="welcome-method">
          <Highlight className="ruby">
            { this.welcomeEmail() }
          </Highlight>
        </div>
      </GuideWrapper>
    );
  }
}
