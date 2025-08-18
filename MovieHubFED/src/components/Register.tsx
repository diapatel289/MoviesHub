import { Text, Field, withDatasourceCheck, LinkField } from '@sitecore-jss/sitecore-jss-nextjs';
import { ComponentProps } from 'lib/component-props';
import { JSX, useEffect, useState } from 'react';
import NextLink from 'next/link';
import { useRouter } from 'next/router';

type RegisterProps = ComponentProps & {
  fields: {
    heading: Field<string>;
    FullNameHeading: Field<string>;
    EmailHeading: Field<string>;
    PasswordHeading: Field<string>;
    CTAName: Field<string>;
    CTALink: LinkField;
    Title: Field<string>;
  };
};

const Register = (props: RegisterProps): JSX.Element => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleSubmit = async(e: React.FormEvent) => {
    e.preventDefault();

    useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      router.replace('/movies');
    }
  }, []);

    try {
      const response = await fetch('https://localhost:7107/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: fullName,
          email: email,
          password: password,
        }),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        alert(result.message); // Optional
        router.push('/login');
      } else {
        alert(result.message || 'Registration failed');
      }
    } catch (error) {
      console.error('Registration error:', error);
      alert('Something went wrong. Please try again later.');
    }
  };

  return (
    <div className="login-box">
      <h2>{props.fields.Title?.value}</h2>
      <form onSubmit={handleSubmit}>
        <div className="user-box">
          <input
            type="text"
            name="fullName"
            required
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />
          <label>{props.fields.FullNameHeading?.value}</label>
        </div>

        <div className="user-box">
          <input
            type="email"
            name="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label>{props.fields.EmailHeading?.value}</label>
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
        Already have Account??{' '}
        <span>
          <NextLink href="/" className="LoginText__register">
            Login
          </NextLink>
        </span>
      </div>
    </div>
  );
};

export default withDatasourceCheck()<RegisterProps>(Register);
