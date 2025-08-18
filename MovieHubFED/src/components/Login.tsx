import { Text, Field, withDatasourceCheck, LinkField } from '@sitecore-jss/sitecore-jss-nextjs';
import { ComponentProps } from 'lib/component-props';
import { JSX, useEffect, useState } from 'react';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { useAuth } from '../Contexts/AuthContext';

type LoginProps = ComponentProps & {
  fields: {
    Title: Field<string>;
    UsernameHeading: Field<string>;
    PasswordHeading: Field<string>;
    CTAName: Field<string>;
    CTALink: LinkField;
  };
};

const Login = (props: LoginProps): JSX.Element => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();
  const { token, setToken,setRole  } = useAuth();

  useEffect(() => {
    if (token) {
      router.replace('/movies');
    }
  }, [token]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('https://localhost:7107/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: username,
          password: password,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data.token);
        
        setRole(data.role);
          router.push('/movies');
        
      } else {
        alert('Invalid credentials');
      }
    } catch (error) {
      console.error('Login failed:', error);
      alert('Something went wrong. Please try again.');
    }
  };

  return (
    <div className="login-box">
      <h2>{props.fields.Title?.value}</h2>
      <form onSubmit={handleSubmit}>
        <div className="user-box">
          <input
            type="text"
            name="username"
            required
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <label>{props.fields.UsernameHeading?.value}</label>
        </div>
        <div className="user-box">
          <input
            type="password"
            name="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <label>{props.fields.PasswordHeading?.value}</label>
        </div>
        <button type="submit" className="submit-link">
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          {props.fields.CTAName?.value}
        </button>
      </form>
      <div className="LoginText">
        Don't hvae account Don't worry!!!{' '}
        <span>
          <NextLink href="/Register" className="LoginText__register">
            Register
          </NextLink>
        </span>
      </div>
    </div>
  );
};

export default withDatasourceCheck()<LoginProps>(Login);


