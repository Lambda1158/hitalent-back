import React from "react";
// import { useDispatch } from 'react-redux'
// import { searchTalent } from "../../actions";

export default function LandingSearchbar() {

    // const [ search, setSearch ] = useState('')
    // const dispatch = useDispatch()

    // function onSubmit(e) {
    //     e.preventDefault()
    //     dispatch(searchTalent(search))
    // }
    // function onChange(e) {
    //     e.preventDefault()
    //     setSearch(e.target.value)
    // }

    return (
        <div class="p-3 h-72 bg-light rounded-md m-5 flex flex-col items-center justify-around bg-opacity-70">
            <div class="flex flex-col items-center">
                <h3 class="font-semibold text-3xl mb-4">¿Quieres aprender algo nuevo?</h3>
                <small class="text-2xl">¡Busca en este sitio y encuentra lo adecuado para ti!</small>
            </div>
            {/* <form onSubmit={onSubmit}>
            <div class="searchbar-inner bg-gray-200">
              <div class="searchbar-input-wrap container flex justify-center items-center px-4 sm:px-6 lg:px-8">
                <input
                  onChange={onChange}
                  type="search"
                  class="h-10 w-52 pr-8 pl-5 rounded z-0 focus:shadow focus:outline-none"
                  placeholder="Prueba con 'cocinar'"
                />
                <button>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                      clip-rule="evenodd"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </form> */}
        </div>
    )
}