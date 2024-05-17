import axios from 'axios';

interface ArticleType {
    _id: string
    title: string
    description: string
    category: string
}

class TodolistAPI {
    /**
      * Get all tasks
      * @returns {ArticleType[]}
      */
    static getAllArticles = async (): Promise<ArticleType[]> => 
        await axios.get(
            "http://localhost:3000/articles", 
            {headers: {"Access-Control-Allow-Origin": "*"}})
            .then(res => res.data)
            .catch(err => err)
    /**
      * Delete a task by id
      * @param {string} id
      * @returns {number} deletedCount - The area of the rectangle
      */
    static deleteArticleById = async (id: string): Promise<number> => 
        await axios.delete(
            `http://localhost:3000/articles/${id}`, 
            {headers: {"Access-Control-Allow-Origin": "*"}})
            .then(res => res.data.deletedCount)
            .catch(err => err)
    /**
      * Modify the status of a task
      * @param {string} id 
      * @param {string} statut 
      * @returns {number} modifiedCount - Count number of mofified task
      */
    static changeTaskById = async (id: string, statut: string): Promise<number> => 
        await axios.post(
            `http://localhost:3000/articles/${id}`,
            {headers: {"Access-Control-Allow-Origin": "*"}}, 
            {params: {statut}})
            .then(res => res.data.modifiedCount)
            .catch(err => err)

    /**
      * Create a new task
      * @param {number} title 
      * @param {string} description 
      * @param {string} category 
      * @returns {string} insertedId - id of an created task
      */
    static createTask = async (title: string, description: string, category: string): Promise<string> => 
        await axios.post(
            "http://localhost:3000/articles/",
            {headers: {"Access-Control-Allow-Origin": "*"}}, 
            {params: {title, category, description}})
            .then(res => res.data.insertedId)
            .catch(err => err)
}

export default TodolistAPI