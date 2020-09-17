import React from 'react';
import { Link } from 'gatsby';

export default function Contact() {
  return (
    <div style={{ color: `teal` }}>
      <h1>About Gatsby</h1>
      <p>Such wow. Very React.</p>
      <Link to="/404/">Error</Link>
    </div>
  );
}