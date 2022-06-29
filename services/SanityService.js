import sanityClient from "@sanity/client";
const homeUrl = `*[_type == 'home'][0]{'mainPostUrl':mainPost-> slug.current}`;
const postsUrl = `
*[_type == 'post']{
  title,
  subtitle,
  createdAt,
  shortContent,
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
  'tag': tag -> {
    title,
    'slug': slug.current
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
}
