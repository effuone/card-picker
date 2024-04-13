import { Link } from 'react-router-dom';
// import logo from '@/assets/logo.png';
import UserLoginForm from '@/components/user-login-form';
import { useState } from 'react';
import UserRegistrationForm from '@/components/user-registration-form';

export default function AuthenticationPage() {
  const [isLogin, setIsLogin] = useState<boolean>(true);

  const toggleForm = () => {
    setIsLogin(!isLogin);
  };

  return (
    <div className="flex min-h-screen">
      {/* Left Side with Image and Overlay Text */}
      <div className="relative w-full h-screen lg:w-1/2 hidden lg:block">
        <img
          src="https://blogassets.airtel.in/wp-content/uploads/2023/03/7-1.jpg"
          alt="Background"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col p-10">
          <div className="flex items-center text-2xl font-bold space-x-2">
            <span className="flex justify-between text-ring dark:text-primary">
              CardPicker
            </span>
            {/* <img className="h-10 w-auto" src={logo} alt="CardPicker" /> */}
          </div>
          <blockquote className="flex-1 flex flex-col mt-auto justify-end text-white">
            <p className="text-xl">
              "Теперь я могу быстро найти самую оптимальную карту для покупок
              товаров разных категорий. Я просто указываю типы своих банковских
              карт и теперь могу максимизировать кэшбек от своих покупок!"
            </p>
            <footer className="text-lg">(С) Timur Turlov</footer>
          </blockquote>
          <div className="text-right">{/* Login or other links here */}</div>
        </div>
      </div>

      <div className="w-full lg:w-1/2 flex flex-col justify-center p-10">
        <div className="max-w-md mx-auto flex flex-col justify-center">
          <div className="flex flex-col items-center">
            <h1 className="text-4xl font-bold mb-6 justify-self-center">
              {isLogin ? 'Логин' : 'Регистрация'}
            </h1>
            <p className="mb-2 justify-self-center">
              {isLogin
                ? 'Введите свои данные для входа в аккаунт'
                : 'Введите свои данные для регистрации'}
            </p>
          </div>
          {isLogin ? <UserLoginForm /> : <UserRegistrationForm />}
          <p className="mt-4 text-xs self-center">
            {isLogin ? (
              <span className="text-lg">
                Все еще без аккаунта?{' '}
                <a
                  href="#"
                  onClick={toggleForm}
                  className="underline cursor-pointer"
                >
                  Зарегестрируйтесь!
                </a>
              </span>
            ) : (
              <span className="text-lg self-center">
                Уже зарегестрированы?{' '}
                <a
                  href="#"
                  onClick={toggleForm}
                  className="underline cursor-pointer"
                >
                  Войдите в аккаунт!
                </a>
              </span>
            )}
          </p>
          {!isLogin && (
            <p className="mt-4 text-xs ">
              By clicking continue, you agree to our
              <Link to="/terms" className="underline">
                Terms of Service{' '}
              </Link>
              and{' '}
              <Link to="/privacy" className="underline">
                Privacy Policy
              </Link>
              .
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
