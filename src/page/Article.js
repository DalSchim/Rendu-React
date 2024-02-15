//afficher l'article en fonction de l'id
import {useState} from "react";
import {articleAPI, useGetArticlesQuery} from "../API/API"

export default function () {

    let {data, isFetching} = useGetArticlesQuery()

    return <div>Articles
        {
            isFetching ? <p>ça fetch</p> : <div>
                <br/>
                Articles Count: {data.length}
                <ArticlesList/>
            </div>
        }
    </div>
}
