import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { rules } from 'src/utils/rules'
import { useMutation } from '@tanstack/react-query'
import { loginAcount } from 'src/apis/auth.api'
//error 422 api
import { isAxiosUnprocessableEntityError } from 'src/utils/utils'
import { ErrorResponse } from 'src/types/utils.type'
import { useContext } from 'react'
import { AppContext } from 'src/contexts/app.context'
import Button from 'src/components/Button'
//end-error 422 api

interface FormData {
  email: string
  password: string
}
export default function Login() {
  const { setIsAuthenticated, setProfile } = useContext(AppContext)
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors }
  } = useForm<FormData>()

  const loginAcountMutation = useMutation({
    mutationFn: (body: FormData) => loginAcount(body)
  })

  const onSubmit = handleSubmit((data) => {
    const body = data
    loginAcountMutation.mutate(body, {
      onSuccess: (data) => {
        setIsAuthenticated(true)
        setProfile(data.data.data.user)
        navigate('/')
      },
      //xu ly loi 422 api
      onError: (error) => {
        if (isAxiosUnprocessableEntityError<ErrorResponse<FormData>>(error)) {
          const formError = error.response?.data.data
          if (formError) {
            Object.keys(formError).forEach((key) => {
              setError(key as keyof FormData, {
                message: formError[key as keyof FormData],
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
            <form className='p-10 rounded bg-white shadow-sm' onSubmit={onSubmit}>
              <div className='mt-3'>
                <div className='text-2xl text-center'> Đăng nhập</div>
              </div>
              <div className='mt-8'>
                <input
                  type='mail'
                  {...register('email', rules.email)}
                  placeholder='Email'
                  className='p-3 outline-none border border-gray-300 focus:border-gray-500 rounded-sm
                focus:shadow-sm w-full'
                />
                <div className='mt-1 text-red-600 text-sm min-h-[1rem]'>{errors.email?.message}</div>
              </div>

              <div className='mt-4'>
                <input
                  type='password'
                  {...register('password', rules.password)}
                  placeholder='Password'
                  className='p-3 outline-none border border-gray-300 focus:border-gray-500 rounded-sm
                focus:shadow-sm w-full'
                />
                <div className='mt-1 text-red-600 text-sm min-h-[1rem] px-2'>{errors.password?.message}</div>
              </div>

              <div className='mt-4'>
                <Button
                  type='submit'
                  className='w-full text-center py-4 px-2 uppercase bg-red-500 text-white text-sm hover:bg-red-600'
                  isLoading={loginAcountMutation.isLoading}
                  disabled={loginAcountMutation.isLoading}
                >
                  Đăng nhập
                </Button>
                <div className='flex justify-center mt-8'>
                  <div className='text-gray-400'>Bạn đã có tài khoản chưa?.</div>
                  <Link to='/register' className='text-red-500 ml-1 hover:text-red-600'>
                    Đăng ký
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
