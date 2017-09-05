import React from 'react';
import PropTypes from 'prop-types';

import { getSiteHeader } from '../layouts';
import { Member, Stage } from '../components/molecules';
import { MediumTeaser } from '../components/organisms';

import teamStageSrc from '../data/team/thilo-peter-meeting.jpg';

const Agency = ({ data }) =>
  (<div>
    {getSiteHeader(
      'Agentur',
      'Wir sind ein junges, dynamisches Team, bestehend aus acht Leuten. Unser breit gestreutes Wissen in sämtlichen Webbereichen unterstützt Sie dabei, sich und Ihr Unternehmen weiterzuentwickeln.',
    )}
    <Stage
      modifiers={['gradient', 'right-highlighted']}
      image={{
        src: teamStageSrc,
        alt: 'Zwei smartive Mitarbeiter bei einer Besprechung',
      }}
      title={
        <h1>
          Creating a <em>smarter</em> web, together.
        </h1>
      }
    >
      <p>
        Wir sind ein junges, dynamisches Team, bestehend aus acht Leuten. Unser breit gestreutes
        Wissen in sämtlichen Webbereichen unterstützt Sie dabei, sich und Ihr Unternehmen
        weiterzuentwickeln.
      </p>
    </Stage>

    <div className="container">
      <div className="row">
        {data.allMembersJson.edges.map(({ node }) =>
          (<Member
            key={node.name}
            name={node.name}
            job={node.job}
            image={{
              src: node.img.childImageSharp.original.src,
              alt: node.name,
            }}
            education={node.education}
            links={node.links}
          >
            <p dangerouslySetInnerHTML={{ __html: node.description }} />
          </Member>),
          )}
      </div>
    </div>

    <MediumTeaser posts={data.allMediumPost} />
  </div>);

Agency.propTypes = {
  data: PropTypes.objectOf(PropTypes.object).isRequired,
};

export default Agency;

export const pageQuery = graphql`
  query AgencyQuery {
    allMediumPost(limit: 2, sort: { fields: [createdAt], order: DESC }) {
      edges {
        node {
          id
          title
          uniqueSlug
          author {
            name
          }
          virtuals {
            subtitle
            previewImage {
              imageId
            }
          }
        }
      }
    }
    allMembersJson {
      edges {
        node {
          img {
            childImageSharp {
              original {
                src
              }
            }
          }
          job
          name
          education
          description
          links {
            text
            url
          }
        }
      }
    }
  }
`;
