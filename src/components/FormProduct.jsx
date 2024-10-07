import React from "react";
import { Formik } from "formik";
import * as Yup from 'yup'

const FormProduct=() => {
    const initialValues={
        name:'',
        descripcion:'',
        imagen:'',
        stock:'',
        price:''
    }
    const validationSchema = Yup.object().shape({
        name: Yup.string().min(4,'nombre muy corto bro')
        .max(20,'no pongas un nombre muy largo')
        .required('el campo es obligatorio'),

        descripcion: Yup.string().min(10,'descri muy corto bro')
        .max(140,'no pongas una descri muy larga')
        .required('el campo es obligatorio'),

        imagen: Yup.string()
        .required('el campo es obligatorio'),

        stock: Yup.string()
        .required('el campo es obligatorio'),

        price: Yup.string()
        .required('el campo es obligatorio')


    })
    return(
 <Formik
 initialValues={initialValues}
 validationSchema={validationSchema}
 onSubmit={(values)=>{
    console.log(values);

            }}> {
                ({ values, isSubmitting, errors, touched }) => (
                    <Form>
                <label htmlFor='name'>Nombre del producto</label>
                <Field id='name' type='text' placeholder='Prueba de nombre' name='name'></Field>
                {errors.name && touched.name &&(
                    <ErrorMessage name='name' component='div'></ErrorMessage>

                )  
                }

                        <label htmlFor='name'>Descripcion del producto</label>
                        <Field id='descripcion' type='text' placeholder='Una descri' name='descripcion'></Field>
                        {errors.name && touched.name && (
                            <ErrorMessage name='descripcion' component='div'></ErrorMessage>

                        )
                        }
                        <label htmlFor='imagen'>Imagen del producto</label>
                        <Field id='imagen' type='text' placeholder='Imagen de ' name='imagen'></Field>
                        {errors.name && touched.name && (
                            <ErrorMessage name='imagen' component='div'></ErrorMessage>

                        )
                        }
                        <label htmlFor='stock'>stock del producto</label>
                <Field id='stock' type='text' placeholder='stock de producto' name='stock'></Field>
                {errors.name && touched.name &&(
                    <ErrorMessage name='stock' component='div'></ErrorMessage>

                )  
                }<label htmlFor='price'>precio del producto</label>
                <Field id='price' type='text' placeholder='precio de nombre' name='price'></Field>
                {errors.name && touched.name &&(
                    <ErrorMessage name='price' component='div'></ErrorMessage>

                )  
                }
                <button type='submit'>Cargar Nuevo Producto</button>
                {
                    isSubmitting ? (<p>Enviando nuevo producto</p>):null
                }
                    </Form>
                )
            }
    
 </Formik>
    )
}
export default FormProduct