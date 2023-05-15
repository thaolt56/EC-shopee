import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { rules } from 'src/utils/rules'
import { omit } from 'lodash'
import { useMutation } from '@tanstack/react-query'
import { registerAcount } from 'src/apis/auth.api'
//error 422 api
import { isAxiosUnprocessableEntityError } from 'src/utils/utils'
import { ErrorResponse } from 'src/types/utils.type'
import { AppContext } from 'src/contexts/app.context'
//end-error 422 api
import { useContext } from 'react'
import Button from 'src/components/Button'
interface FormData {
  email: string
  password: string
  confirm_password: string
}
export default function Register() {
  const { setIsAuthenticated } = useContext(AppContext)
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    getValues,
    setError,
    formState: { errors }
  } = useForm<FormData>()

  const registerAcountMutation = useMutation({
    mutationFn: (body: Omit<FormData, 'confirm_password'>) => registerAcount(body)
  })
  const onSubmit = handleSubmit((data) => {
    const body = omit(data, ['confirm_password'])
    registerAcountMutation.mutate(body, {
      onSuccess: () => {
        setIsAuthenticated(true)
        navigate('/')
      },
      //xu ly loi 422 api
      onError: (error) => {
        if (isAxiosUnprocessableEntityError<ErrorResponse<Omit<FormData, 'confirm_password'>>>(error)) {
          const formError = error.response?.data.data
          if (formError) {
            Object.keys(formError).forEach((key) => {
              setError(key as keyof Omit<FormData, 'confirm_password'>, {
                message: formError[key as keyof Omit<FormData, 'confirm_password'>],
                type: 'Server'
              })
            })
          }
        }
        //console.log('error', error)
      }
    })
  })

  return (
    <div className='bg-orange'>
      <div className='max-w-7xl mx-auto px-4'>
        <div className='grid lg:grid-cols-5 grid-cols-1 py-12 lg:py-32 lg:pr-10'>
          <div className='lg:col-span-2 lg:col-start-4'>
            <form className='p-10 rounded bg-white shadow-sm ' onSubmit={onSubmit}>
              <div className='text-2xl'>Đăng ký tài khoản</div>
              <div className='mt-8'>
                <input
                  type='mail'
                  placeholder='Email'
                  {...register('email', rules.email)}
                  className='p-3 outline-none border border-gray-300 focus:border-gray-500 rounded-sm
                focus:shadow-sm w-full'
                />
                <div className='mt-1 text-red-600 text-sm min-h-[1.25rem] px-2'>{errors.email?.message}</div>
              </div>
              <div className='mt-4'>
                <input
                  type='password'
                  {...register('password', rules.password)}
                  placeholder='Password'
                  className='p-3 outline-none border border-gray-300 focus:border-gray-500 rounded-sm
                focus:shadow-sm w-full'
                />
                <div className='mt-1 text-red-600 text-sm min-h-[1.25rem] px-2'>{errors.password?.message}</div>
              </div>
              <div className='mt-3'>
                <input
                  type='password'
                  {...register('confirm_password', {
                    ...rules.confirm_password,
                    validate: (value) => value === getValues('password') || 'Nhập lại password không khớp!'
                  })}
                  placeholder='Confirm Password'
                  className='p-3 outline-none border border-gray-300 focus:border-gray-500 rounded-sm
                focus:shadow-sm w-full'
                />
                <div className='mt-1 text-red-600 text-sm min-h-[1rem] px-2'>{errors.confirm_password?.message}</div>
              </div>

              <div className='mt-3'>
                <Button
                  type='submit'
                  className='w-full text-center py-4 px-2 uppercase bg-red-500 text-white text-sm hover:bg-red-600'
                  isLoading={registerAcountMutation.isLoading}
                  disabled={registerAcountMutation.isLoading}
                >
                  Đăng ký
                </Button>
                <div className='flex justify-center mt-8'>
                  <div className='text-gray-400'>Bạn đã có tài khoản chưa?.</div>
                  <Link to='/login' className='text-red-500 ml-1 hover:text-red-600'>
                    Đăng nhập
                  </Link>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
