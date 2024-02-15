import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const productsAPI = createApi({
    tagTypes: ["products"], /* tag des produis*/
    reducerPath: 'productsAPI',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://iim.etherial.fr' }),
    endpoints: (builder) => ({


        // appel api recuperation des produit
        getProducts: builder.query({
            query: () => `products`,
            providesTags: ["products"] // On set le tag pour Articles
        }),

        // recuperation des commataire
        getComments: builder.query({
            query: () => `comments`,
            providesTags: ["comments"]
        }),

        // on recupere les commantair par id du produit
        fetchProducts: builder.query({
            query: (id) => ({
                url: `/products/${id}/comments`,
                method: "GET",
            }),
            invalidatesTags: ["products"] // On invalide le tag
        }),


        postComment: builder.mutation({
            query: ({ id, comment, username  }) => ({
                url: `/products/${id}/comments`,
                method: "POST",
                body: {
                    comment: comment,
                    username: username,
                }
            }),
            invalidatesTags: ["products", "comments"]
        }),
    }),
})

export const { useGetProductsQuery, useFetchProductsQuery, usePostCommentMutation } = productsAPI