import Image from 'next/image';
import { Inter } from 'next/font/google';
import { Box } from '@infojob/components/assets/svgs/box';

import { ButtonFill } from '@infojob/components/ButtonFill';
import { IconInfoJob } from '@infojob/components/assets/svgs/IconInfoJob';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import { getCookie, setCookie } from 'cookies-next';
import ErrorView from '@infojob/components/Error';
import LoginHome from '@infojob/components/assets/svgs/LoginHome';

const inter = Inter({ subsets: ['latin'] });


const URL_Login =
  `https://www.infojobs.net/api/oauth/user-authorize/index.xhtml?scope=CANDIDATE_PROFILE_WITH_EMAIL,CV,CANDIDATE_READ_CURRICULUM_CVTEXT,CANDIDATE_EDIT_CURRICULUM_CVTEXT,CANDIDATE_READ_CURRICULUM_EDUCATION,CANDIDATE_READ_CURRICULUM_EXPERIENCE,CANDIDATE_READ_CURRICULUM_FUTURE_JOB,CANDIDATE_READ_CURRICULUM_PERSONAL_DATA,CANDIDATE_READ_CURRICULUM_SKILLS,MY_APPLICATIONS,APPLICATION_TIMELINE,COVER_LETTER_READ&client_id=a0fa4caafbf84c298b07ce2658489933&redirect_uri=${process.env.NEXT_PUBLIC_REDIRECT_URI}/&response_type=code`;
export default function Home() {
  const router = useRouter();
  const { code } = router.query;
  const [Error, setError] = useState(false)

  useEffect(() => {
    if (getCookie('refresh_token')) {
      router.push('/home');
    }else{
    const codeLocal = getCookie('code');
    const getAccessToken = async (codepass) => {
      axios
        .request({
          method: 'post',
          maxBodyLength: Infinity,
          url: `/api/test`,
          data: {
            code: codepass,
          },
        })
        .then((response) => {
          console.log(response.data);
          const { access_token, refresh_token } = response.data;
          setCookie('access_token', access_token,{
            //response.data.expires_in is miliseconds to date for expires
            expires: new Date(Date.now() + response.data.expires_in),
          });
          setCookie('refresh_token', refresh_token);
          router.push('/home');
        })
        .catch((error) => {
          setError(true)
          console.log(error);
        });
    };
    if (((code && !codeLocal )|| code !== codeLocal)) {
      setCookie('code', code);
      getAccessToken(code);
    }}
    return () => {};
  }, [code]);


  if(Error) return <ErrorView />;

  //TODO: check session
  return (
    <main
      className={`${inter.className} h-[80vh] w-full flex flex-col justify-center items-center`}
    >
      <div className="flex gap-5 p-10 justify-center items-center">
        <div className='flex-1'>
        <Box className="w-full" width="10" />

        </div>
        <div>
          <LoginHome />
          <p className="text-xl text-primary2">Para brindarte un mejor servicio, te invitamos a iniciar sesión en InfoJob.</p>
        </div>
      </div>
      <ButtonFill
        href={URL_Login}
        text={'Iniciar sesion con InfoJobs'}
        className="bg-primaryD3 text-white p-2 rounded-md flex items-center hover:bg-primaryD2"
      >
        <IconInfoJob className="w-12" />
      </ButtonFill>
    </main>
  );
}
