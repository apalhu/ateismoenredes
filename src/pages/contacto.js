import React from "react";
import { graphql } from "gatsby";
import Layout from "../components/layout"
import SEO from "../components/seo"
import ContactForm from "../components/contact"


//class ContactPage extends React.Component {
export default function ContactPage(props) {
  const { data } = props
  
  return (
    <Layout location={props.location} >
      <SEO title="Contacto" />
      <h1>Formulario de contacto</h1>
      <p>{data.site.siteMetadata.contact.sentence}</p>
      
      <ContactForm />
      
    </Layout>
  );
}

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
        headerTitle
        contact {
          formUrl
          sentence
        }
      }
    }
  }
`
