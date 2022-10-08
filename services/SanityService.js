import sanityClient from "@sanity/client";
const homeUrl = `*[_type == 'home']{
  title,
  homeContent
}`;
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
const devLogUrl = `*[_type == 'devLog']{
  name,
  createdAt
}`;

const categoryUrl = `*[_type == 'category']{
  name,
  type,
  slug,
  index
}`;

const subCategoryUrl = `
*[_type == 'subCategory' && references(*[_type=="category" && slug == $category]._id)]{
  name,
  type
}`;

const postInnerUrl = `
  _id,
  title,
  subtitle,
  createdAt,
  postContent,
  viewCount,
  'review': review -> {
    title
  },
  'category' : category -> {
    name,
    type,
    slug
  },
  'subCategory' : subCategory -> {
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
`;
const postAllUrl = `
*[_type == 'post']{
  ${postInnerUrl}
}`;
const postByCategoryUrl = `
*[_type == 'post' && references(*[_type=="category" && slug == $category]._id)]{
  ${postInnerUrl}
}`;
const postByCategoryAndSubCategoryUrl = `
*[_type == 'post' && references(*[_type=="category" && slug == $category]._id)&& references(*[_type=="subCategory" && type == $subCategory]._id)]{
  ${postInnerUrl}
}`;
const postBySlug = `
*[_type == 'post' && slug.current == $slug]{
  ${postInnerUrl}
}`;
const portpolioUrl = `
  *[_type == 'portpolio' && references(*[_type=="subCategory" && type == $subCategory]._id)]{
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
  async getDataBySlug({ slug }) {
    const result = await this._client.fetch(postBySlug, { slug });

    return result[0];
  }
  async getData({ type, category, subCategory }) {
    if (!type) return [];
    if (type === "post") {
      if (!category) {
        return await this._client.fetch(postAllUrl);
      } else if (category === "home") {
        return await this._client.fetch(postAllUrl);
      } else {
        if (!subCategory) {
          return await this._client.fetch(postByCategoryUrl, {
            category,
          });
        } else {
          return await this._client.fetch(postByCategoryAndSubCategoryUrl, {
            category,
            subCategory,
          });
        }
      }
    } else if (type === "portpolio") {
      return await this._client.fetch(portpolioUrl, { subCategory });
    } else if (type === "career") {
      return await this._client.fetch(careerUrl);
    } else {
      return [];
    }
  }
  async getPortpolio(subCategory) {
    return await this._client.fetch(portpolioUrl, { subCategory });
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
  async getCategory() {
    const result = await this._client.fetch(categoryUrl);
    result.sort((a, b) => a.index - b.index);
    return result;
  }
  async getSubCategory(category) {
    const result = await this._client.fetch(subCategoryUrl, { category });
    return result;
  }
  async upCount({ id, count }) {
    this._client.patch(id).inc({ viewCount: 1 }).commit();
  }
  async setReview({ id, coment }) {
    const doc = {
      _id: "my-review",
      _type: "review",
      title: "Sanity Tandem Extraordinaire",
    };

    const review = await this._client.createOrReplace(doc);
    console.log(review);
    await this._client
      .patch(id)
      .setIfMissing({ review: [] })
      .append("review", [review])
      .commit({ autoGenerateArrayKeys: true });
    const result = await this._client.getDocument(id);
    console.log(result);
  }
  async deleteReview({ id }) {
    const reviewsToRemove = ["review[0]"];
    await this._client.patch(id).unset(reviewsToRemove).commit();
    const result = await this._client.getDocument(id);
    console.log(result.review);
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
