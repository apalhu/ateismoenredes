module.exports = {
  siteMetadata: {
    title: `Ateísmo en Redes`,
    headerTitle: `teísmo en Redes`,
    author: ``,
    // You'd normally use a description like
    // "Advice and answers by the MyCompany-Team"
    description: `Listado de cuentas en redes sociales con el ateísmo como característica común.`,
    siteUrl: `https://ateismoenred.es/`,
    language: "es",
    texts: {
      allCollectionsText: "Secciones",
      searchPlaceholderText: "Buscas preguntas?...",
      lastModifiedText: "Ültima edición",
      publishedOnText: "Publicado en",
      writtenByText: "Escrito por",
      articlesInCollectionZeroText: "artículos en esta sección",
      articlesInCollectionOneText: "artículo en esta sección",
      articlesInCollectionTwoText: "artículos en esta sección",
      articlesInCollectionMultipleText: "artículos en esta sección",
    },
    contact: {
      sentence: `Si quieres constar en este listado, o modificar algo en tu descripción, envianos el formulario de contacto.`,
      icon: 'FaHandsHelping',
      formUrl: "http://endpoint.com"
    }
  },
  mapping: {
    "MarkdownRemark.frontmatter.author": `AuthorsYaml`,
    "MarkdownRemark.frontmatter.collection": `CollectionsYaml`,
  },
  plugins: [
    "gatsby-plugin-theme-ui",
    `gatsby-transformer-yaml`,
    `gatsby-plugin-sitemap`,
    "gatsby-plugin-simple-analytics",
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content`,
        name: `articles`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/data`,
        name: `mappings`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/assets`,
        name: `assets`,
      },
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          { 
            resolve: "gatsby-remark-embed-video",
            options: {
              width: 600,
              ratio: 1.77, // Optional: Defaults to 16/9 = 1.77
              height: 400, // Optional: Overrides optional.ratio
              related: false, //Optional: Will remove related videos from the end of an embedded YouTube video.
              noIframeBorder: true, //Optional: Disable insertion of <style> border: 0
              urlOverrides: [
                {
                  id: 'youtube',
                  embedURL: (videoId) => `https://www.youtube-nocookie.com/embed/${videoId}`,
                }
              ], //Optional: Override URL of a service provider, e.g to enable youtube-nocookie support
              containerClass: 'embedVideo-container', //Optional: Custom CSS class for iframe container, for multiple classes separate them by space
            } 
          },
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 590,
            },
          },
          {
            resolve: `gatsby-remark-responsive-iframe`,
            options: {
              wrapperStyle: `margin-bottom: 1.0725rem`,
            },
          },
          `gatsby-remark-prismjs`,
          `gatsby-remark-copy-linked-files`,
          `gatsby-remark-smartypants`,
        ],
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    // {
    //   resolve: `gatsby-plugin-google-analytics`,
    //   options: {
    //     //trackingId: `ADD YOUR TRACKING ID HERE`,
    //   },
    // },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Ateísmo en Redes`,
        short_name: `ateismoenredes`,
        start_url: `/`,
        background_color: `#ffffff`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `assets/favicon.png`,
      },
    },
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-plugin-typography`,
      options: {
        pathToConfigModule: `src/utils/typography`,
      },
    },
    `gatsby-plugin-netlify-cms`,
  ],
}
