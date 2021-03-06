import React from "react"
import { graphql } from "gatsby"
import Seo from "../components/SEO"
import BlogItem from "../components/BlogItem"
import styled from "styled-components"
import Banner from "../components/Banner"

const FeaturedItems = styled.h4`
  font-size: var(--h5);
  color: var(--primaryColor);
`

const HomePage = ({ data }) => {
  const { BlogPostQuery } = data

  return (
    <>
      <Seo />
      <Banner content="Hello! My name is Jessica Woudsma." />
      <FeaturedItems>
        {BlogPostQuery.totalCount} What I Have Written
      </FeaturedItems>
      {BlogPostQuery.edges.map(({ node }, index) => (
        <BlogItem nodeObj={node} index={index} />
      ))}
    </>
  )
}

export default HomePage

export const query = graphql`
  {
    BlogPostQuery: allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
      limit: 3
    ) {
      totalCount
      edges {
        node {
          frontmatter {
            title
            date(formatString: "MMMM DD, YY")
            path
            featuredImage {
              childImageSharp {
                gatsbyImageData(
                  layout: FULL_WIDTH
                  placeholder: TRACED_SVG
                  formats: [AUTO, WEBP]
                )
              }
            }
            featuredImageAlt
          }
          excerpt
        }
      }
    }
  }
`
