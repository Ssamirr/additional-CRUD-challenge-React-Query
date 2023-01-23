import axios from "axios";
import { useQuery } from "react-query";
import Loading from "../components/Loading";
import React from 'react'
import { CategoryService } from "../network/category/CategoryService";
import { Category } from "../models/category/Category";


function CategoriesQuery() {

  let categoryService = new CategoryService();

  const { data, isLoading } = useQuery<Category[]>(
    "categories",
    () => {
      return categoryService.getAll()
        .then(res => {
          return res.data
        })
    },
  );

  return (
    <>
      {isLoading ?
        <Loading />
        :

        data ? (
          <>
            <div className='header-page'>
              <h1 className='all-data-list'>Products</h1>
            </div>

            <table className="w3-table-all w3-centered">
              <thead>
                <tr>
                  <td>Id</td>
                  <td>Name</td>
                  <td>Description</td>
                </tr>
              </thead>
              <tbody>
                {React.Children.toArray(
                  data.map(item => (
                    <tr>
                      <td>{item.id}</td>
                      <td>{item.name}</td>
                      <td>{item.description}</td>
                    </tr>
                  ))
                )}

              </tbody>
            </table>
          </>
        ) :
          <h1 className='not-list'>Product list is empty</h1>
      }


    </>
  );

};

export default CategoriesQuery;