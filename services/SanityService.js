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
  'content':content[]{ 
  ...,
  ...select(_type == 'imageGallery' => {'images':images[]{..., 'url' : asset -> url}})
  }
}`;
const devLogUrl = `*[_type == 'devLog']{
  name,
  createdAt
}`;
const postsUrl = `
*[_type == 'post']{
  title,
  subtitle,
  createdAt,
  shortContent,
  'category' : category -> {
    name,
    type
  },
  'content':content[]{ 
    ...,
    ...select(_type == 'imageGallery' => {'images':images[]{..., 'url' : asset -> url}})
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
    'content':content[]{ 
      ...,
      ...select(_type == 'imageGallery' => {'images':images[]{..., 'url' : asset -> url}})
    },
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

  async getPosts() {
    return await this._client.fetch(postsUrl);
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
