import { useState } from 'react';
import { Formik, Form, Field, ErrorMessage as FormikErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Link } from 'react-router-dom';

import useMarvelService from '../../services/MarvelService';
import ErrorMessage from '../errorMessage/errorMessage';

import './SearchPanel.scss';

const SearchPanel = () => {

    const [char, setChar] = useState(null)
    const {loading, error, clearError, getCharacterByName} = useMarvelService();

    const onCharLoaded = (char) => {
        setChar(char);
    }

    const updateChar = (name) => {
        clearError();

        getCharacterByName(name)
            .then(onCharLoaded);
    }

    const errorMessage = error ? <div className="search__critical-error"><ErrorMessage/></div> : null;
    const results = !char ? null : char.length > 0 ?
          <div className="search__wrapper">
            <div className="search__succsess">There is! Visit {char[0].name} page?</div>
            <Link to={`/characters/${char[0].id}`} className='button button__secondary'>
                <div className="inner">To page!</div>
            </Link>
          </div> :
          <div className="search__error">
            The character was not found. Check the name and try again
          </div>;

    return (
        <div className="search__form">
            <Formik
                initialValues={{
                    charName: ''
                }}
                validationSchema={Yup.object({
                    charName: Yup.string().required('This field is required')
                })}
                onSubmit = { ({charName}) => {
                    updateChar(charName);
                }}>
                <Form>
                    <div className="search__title" htmlFor="charName">Find a character by name:</div>

                    <div className='search__wrapper'>
                        <Field 
                            placeholder='Enter name' 
                            id='charName' name='charName' 
                            type='text' />
                        <button 
                            type='submit' 
                            className="button button__main" 
                            disabled={loading}>
                            <div className="inner">find</div>
                        </button>
                    </div>
                    <FormikErrorMessage component="div" className="search__error" name="charName" />
                </Form>
            </Formik>
            {results}
            {errorMessage}
        </div>
    )
}

export default SearchPanel;