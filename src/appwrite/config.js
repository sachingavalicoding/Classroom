import conf from "../conf/conf";
import { Client, Databases, ID, Query, Storage } from "appwrite";

export class Service {
    client = new Client();
    databases;
    backet;

    constructor() {
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId);
        this.databases = new Databases(this.client);
        this.backet = new Storage(this.client);

    }

    async createPost({ title, slug, imageId, userId, content, status }) {
        try {
            return await this.databases.createDocument(
                conf.appwriteDatabaseId,
                conf.appwriteBlogCollectionId,
                slug,
                {
                    title,
                    imageId,
                    content,
                    status,
                    userId,
                }
            )
        } catch (error) {
            console.log(" Create Post :::", error)
        }
    }

    async updatePost({ title, slug, imageId, userId, content, status }) {
        try {
            return await this.databases.updateDocument(
                conf.appwriteDatabaseId,
                conf.appwriteBlogCollectionId,
                slug, {
                title,
                imageId,
                content,
                status,
                userId,
            }
            )
        } catch (error) {
            console.log(" Update Post :::", error)
        }
    }

    async deletePost(slug) {
        try {
            await this.databases.deleteDocument(
                conf.appwriteDatabaseId,
                conf.appwriteBlogCollectionId,
                slug
            )
            // frontend true return to delate post 
            return true;
        } catch (error) {
            console.log(" Delate Post ::", error)
            // not delate 
            return false;
        }
    }


    async getPost(slug) {
        try {
            return await this.databases.getDocument(
                conf.appwriteDatabaseId,
                conf.appwriteBlogCollectionId,
                slug
            )
        } catch (error) {
            console.log(" Get Post :::", error);
            return false;
        }
    }
    // to search an active post only use queries for seach in app
    async getPosts(queries = [Query.equal("status", "active")]) {
        try {
            return await this.databases.listDocuments(conf.appwriteDatabaseId,
                conf.appwriteBlogCollectionId,
                queries
            )
        } catch (error) {
            console.log("All Post get Error :::", error)
            return false;
        }
    }

    // file upload 
    async uploadFile(file) {
        try {
            return await this.backet.createFile(
                conf.appwriteBucketId,
                ID.unique(),
                file
            )
        } catch (error) {
            console.log(" Upload FIle ::", error)
        }
    }

    async dealteFile(fileId) {
        try {
            await this.backet.deleteFile(
                conf.appwriteBucketId,
                fileId
            )
            return true;
        } catch (error) {
            console.log("Delete file FIle ::", error);
            return false;
        }
    }

    getFilePreview(fileId) {
        this.backet.getFilePreview(
            conf.appwriteBucketId,
            fileId
        )
    }
}
const service = new Service();

export default service;