import React, { useState } from "react";
import './login.css'
import Logo1 from '../../assets/images/login/log.svg'
import Logo2 from '../../assets/images/login/register.svg' 


const Login = () => {
  const [tab, setTab] = useState('');

  return (
    <>
      <div id='login' class={`containerH ${tab}`}>
        <div class="forms-container">
          <div class="signin-signup">
            <form action="/login" method="post" class="sign-in-form">
              <h2 class="title">Sign in</h2>
              <div class="input-field">
                <i class="fas fa-user"></i>
                <input type="text" placeholder="Username" />
              </div>
              <div class="input-field">
                <i class="fas fa-lock"></i>
                <input type="password" placeholder="Password" />
              </div>
              <input type="submit" value="Login" class="btn solid" />
              <p class="social-text">Or Sign in with social platforms</p>
              <div class="social-media">
                <a href="#" class="social-icon">
                  <i class="fab fa-google"></i>
                </a>
              </div>
            </form>
            <form action="/signup" method="post" class="sign-up-form">
              <h2 class="title">Sign up</h2>
              <div class="input-field">
                <i class="fas fa-user"></i>
                <input type="text" placeholder="Username" />
              </div>
              <div class="input-field">
                <i class="fas fa-envelope"></i>
                <input type="email" placeholder="Email" />
              </div>
              <div class="input-field">
                <i class="fas fa-lock"></i>
                <input type="password" placeholder="Password" />
              </div>
              <input type="submit" class="btn" value="Sign up" />
              <p class="social-text">Or Sign up with social platforms</p>
            </form>
          </div>
        </div>

        <div class="panels-container">
          <div class="panel left-panel">
            <div class="content">
              <h3>New here ?</h3>
              <p>
                For an improved Learning and Teaching Experience!
              </p>
              <button class="btn transparent" id="sign-up-btn" onClick={() => setTab('sign-up-mode')}>
                Sign up
              </button>
            </div>
            <img src={Logo1} class="image" alt="cdeve" />
          </div>
          <div class="panel right-panel">
            <div class="content">
              <h3>One of us ?</h3>
              <p>
                Education is the key to a successful Youth
              </p>
              <button class="btn transparent" id="sign-in-btn" onClick={() => setTab('')}>
                Sign in
              </button>
            </div>
            <img src={Logo2} class="image" alt="" />
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
