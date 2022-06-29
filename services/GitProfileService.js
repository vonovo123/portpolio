const gitAPIURL = "https://api.github.com/users/vonovo123";
export default class GitProfileService {
  async getProfile() {
    const response = await fetch(gitAPIURL);
    console.log(response);
    return response.json();
  }
}
