import sanityClient from "@sanity/client";
const profileUrl = `
*[_type == 'profile']{
  company,
  location,
  gitUrl,
  intro,
  'thumbnail' : {
    'alt' : thumbnail.alt,
    'imageUrl' : thumbnail.asset  -> url,
  }
}
`;
const homeUrl = `*[_type == 'home']{
  title,
  homeContent
}`;
const devLogUrl = `*[_type == 'devLog']{
  name,
  createdAt
}`;
const devPostUrl = `
*[_type == 'devPost']{
  title,
  subtitle,
  createdAt,
  postContent,
  'category' : category -> {
    name,
    type
  },
  'slug': slug.current,
  'thumbnail' : {
    'alt' : thumbnail.alt,
    'imageUrl' : thumbnail.asset  -> url,
  },
  'author' : author -> {
    name,
    role,
    'image' : image.asset -> url  
  },
  'tag': tag[]{
    _type == 'reference' => @ -> {
      title,
      'slug': slug.current
    }
  }
}`;
const portpolioUrl = `
  *[_type == 'portpolio']{
    'category' : category -> {
      name,
      type
    },
    shortContent,
    'skills': skills[]{
      _type == 'reference' => @ -> {
        name,
        'iconUrl' : iconUrl.asset -> url
      }
    },
    title,
    'author' : author -> {
      name,
      role,
      'image' : image.asset -> url  
    },
    repoUrl,
    demoUrl,
    portpolioContent,
    createdAt,
    'thumbnail' : {
      'alt' : thumbnail.alt,
      'imageUrl' : thumbnail.asset  -> url,
    }
  }
`;

const careerUrl = `
*[_type == 'career']{
  name,
  from,
  to,
  'works': works[]{
      _type == 'reference' => @ -> {
        name,
        from,
        to,
        description,
        'skills': skills[]{
          _type == 'reference' => @ -> {
            name,
            'iconUrl' : iconUrl.asset -> url
          }
        }
      }
    }
  }
`;
export default class SanityService {
  _client = sanityClient({
    dataset: "production",
    projectId: process.env.SANITY_PROJECT_ID,
    apiVersion: "2022-06-18", // use a UTC date string
    token: process.env.SANITY_AUTH_TOKEN, // or leave blank for unauthenticated usage
    useCdn: process.env.NODE_ENV === "production",
  });

  async getHome() {
    return await this._client.fetch(homeUrl);
  }

  async getDevPost() {
    return await this._client.fetch(devPostUrl);
  }
  async getPortpolio() {
    return await this._client.fetch(portpolioUrl);
  }
  async getCareer() {
    return await this._client.fetch(careerUrl);
  }
  async getDevLog() {
    return await this._client.fetch(devLogUrl);
  }
  async getProfile() {
    return await this._client.fetch(profileUrl);
  }
}

// 'content':content[]{
//   ...,
//   ...select(_type == 'imageGallery' => {'images':images[]{..., 'url' : asset -> url}})
// },

// 'content':content[]{
//   ...,
//   ...select(_type == 'imageGallery' => {'images':images[]{..., 'url' : asset -> url}})
//   }

// 'content':content[]{
//   ...,
//   ...select(_type == 'imageGallery' => {'images':images[]{..., 'url' : asset -> url}})
// },
