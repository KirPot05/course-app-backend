import axios from "axios";
import fs from "fs";

class VideoService {
  private clientId: string;
  private clientSecret: string;
  private redirectUri: string;
  private accessToken: string | null;

  constructor(clientId: string, clientSecret: string, redirectUri: string) {
    this.clientId = clientId;
    this.clientSecret = clientSecret;
    this.redirectUri = redirectUri;
    this.accessToken = null;
  }

  // Generate Vimeo authorization URL
  public getAuthorizationUrl(): string {
    const scopes = "private public";
    return `https://api.vimeo.com/oauth/authorize?response_type=code&client_id=${this.clientId}&redirect_uri=${this.redirectUri}&scope=${scopes}`;
  }

  // Exchange authorization code for access token
  public async getAccessToken(authorizationCode: string): Promise<void> {
    const tokenUrl = "https://api.vimeo.com/oauth/access_token";

    try {
      const response = await axios.post(tokenUrl, null, {
        params: {
          grant_type: "authorization_code",
          code: authorizationCode,
          redirect_uri: this.redirectUri,
          client_id: this.clientId,
          client_secret: this.clientSecret,
        },
        headers: {
          "Content-Type": "application/json",
        },
      });

      this.accessToken = response.data.access_token;
    } catch (error) {
      console.error("Error obtaining access token:", error);
      throw error;
    }
  }

  // Upload a video to Vimeo
  public async uploadVideo(filePath: string): Promise<any> {
    if (!this.accessToken) {
      throw new Error("Access token is not available");
    }

    try {
      const uploadUrl = "https://api.vimeo.com/me/videos";

      // Request an upload link from Vimeo
      const uploadLinkResponse = await axios.post(
        uploadUrl,
        {
          type: "streaming",
        },
        {
          headers: {
            Authorization: `Bearer ${this.accessToken}`,
            "Content-Type": "application/json",
          },
        }
      );

      const uploadLink = uploadLinkResponse.data.upload.upload_link;

      // Upload the video to Vimeo
      const videoStream = fs.createReadStream(filePath);
      const uploadResponse = await axios.put(uploadLink, videoStream, {
        headers: {
          "Content-Type": "video/mp4", // Adjust the content type as per your video format
        },
      });

      return uploadResponse.data;
    } catch (error) {
      console.error("Error uploading video to Vimeo:", error);
      throw error;
    }
  }

  // Get video details
  public async getVideoDetails(videoId: string): Promise<any> {
    if (!this.accessToken) {
      throw new Error("Access token is not available");
    }

    try {
      const response = await axios.get(
        `https://api.vimeo.com/videos/${videoId}`,
        {
          headers: {
            Authorization: `Bearer ${this.accessToken}`,
          },
        }
      );

      return response.data;
    } catch (error) {
      console.error("Error fetching video details:", error);
      throw error;
    }
  }

  // Delete a video from Vimeo
  public async deleteVideo(videoId: string): Promise<void> {
    if (!this.accessToken) {
      throw new Error("Access token is not available");
    }

    try {
      await axios.delete(`https://api.vimeo.com/videos/${videoId}`, {
        headers: {
          Authorization: `Bearer ${this.accessToken}`,
        },
      });
    } catch (error) {
      console.error("Error deleting video from Vimeo:", error);
      throw error;
    }
  }
}

export default VideoService;
