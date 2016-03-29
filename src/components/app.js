import React from 'react';
import ReactDOM from 'react-dom';
import { Component } from 'react';
import Highlight from 'react-highlight';
import Clipboard from 'clipboard';
import Stickyfill from 'stickyfill';

class GuideWrapper extends Component {
  componentDidMount() {
    const nav = document.getElementsByClassName("guide-nav")[0];
    const stickyfill = Stickyfill();
    stickyfill.add(nav);
  }

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
        <div className="guide-sidebar">
          <ul className="guide-nav">
            { this.contents() }
          </ul>
        </div>
        <div className="guide-content">
          { this.props.children }
        </div>
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
        <div className="header">
          <h2>Creating Mailers in Rails <span className="sub-header">quick guide to the basics of using Rails Action Mailer</span></h2>
        </div>

        <h4 id="generate-mailer">1. Generate New Mailer</h4>
        <button className="copy-button" data-clipboard-target="#gen-mailer">
          Copy Snippet
        </button>
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
        <button className="copy-button" data-clipboard-target="#default-from">
          Copy Snippet
        </button>
        <div id="default-from">
          <Highlight className="ruby">
            { `default from: 'notifications@example.com'` }
          </Highlight>
        </div>
        <h5>Add method for sending welcome emails</h5>
        <button className="copy-button" data-clipboard-target="#welcome-method">
          Copy Snippet
        </button>
        <div id="welcome-method">
          <Highlight className="ruby">
            { this.welcomeEmail() }
          </Highlight>
        </div>
      </GuideWrapper>
    );
  }
}
