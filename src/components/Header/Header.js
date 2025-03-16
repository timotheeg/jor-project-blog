
'use client';
import React from 'react';
import clsx from 'clsx';
import { Rss, Sun, Moon } from 'react-feather';

import Logo from '@/components/Logo';
import VisuallyHidden from '@/components/VisuallyHidden';
import { LIGHT_TOKENS, DARK_TOKENS } from '@/constants';
import Cookie from 'js-cookie';

import styles from './Header.module.css';

function Header({ theme: initialTheme, className, ...delegated }) {
  const [theme, setTheme] = React.useState(initialTheme);

  function toggleTheme() {
    const nextTheme = theme === 'light' ? 'dark' : 'light';

    // Update the state variable.
    // This causes the Sun/Moon icon to flip.
    setTheme(nextTheme);

    // Write the cookie for future visits
    Cookie.set('color-theme', nextTheme, {
      expires: 1000,
    });

    // Apply the new colors to the root HTML tag.
    const COLORS =
      nextTheme === 'light'
        ? LIGHT_TOKENS
        : DARK_TOKENS;

    const root = document.documentElement;

    root.setAttribute(
      'data-color-theme',
      nextTheme
    );

    Object.entries(COLORS).forEach(([name, value]) => {
      root.style.setProperty(name, value);
    });
  }
  return (
    <header
      className={clsx(styles.wrapper, className)}
      {...delegated}
    >
      <Logo />

      <div className={styles.actions}>
        <button className={styles.action}>
          <Rss
            size="1.5rem"
            style={{
              // Optical alignment
              transform: 'translate(2px, -2px)',
            }}
          />
          <VisuallyHidden>
            View RSS feed
          </VisuallyHidden>
        </button>
        <button className={styles.action} onClick={toggleTheme}>
          {theme === 'light' ? <Sun size="1.5rem" /> : <Moon size="1.5rem" />}
          <VisuallyHidden>
            Toggle dark / light mode
          </VisuallyHidden>
        </button>
      </div>
    </header>
  );
}

export default Header;
