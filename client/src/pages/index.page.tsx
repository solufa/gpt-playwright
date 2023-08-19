import type { TrendModel } from 'commonTypesWithClient/models';
import { useAtom } from 'jotai';
import { useState } from 'react';
import { Loading } from 'src/components/Loading/Loading';
import { BasicHeader } from 'src/pages/@components/BasicHeader/BasicHeader';
import { apiClient } from 'src/utils/apiClient';
import { returnNull } from 'src/utils/returnNull';
import { userAtom } from '../atoms/user';
import styles from './index.module.css';

const Home = () => {
  const [user] = useAtom(userAtom);
  const [trends, setTrends] = useState<TrendModel[]>();
  const fetchTrends = async () => {
    setTrends(undefined);

    const res = await apiClient.trends.$get().catch(returnNull);

    if (res !== null) setTrends(res);
  };

  if (!user) return <Loading visible />;

  return (
    <>
      <BasicHeader user={user} />
      <div className={styles.title} style={{ marginTop: '120px' }}>
        Welcome to frourio!
      </div>

      <div style={{ textAlign: 'center', marginTop: '40px' }}>
        <button onClick={fetchTrends}>Get trends</button>
      </div>
      <ul className={styles.tasks}>
        {trends?.map((trend, i) => (
          <li key={i}>
            <label>
              <span>
                {i + 1}位 {trend.word}
              </span>
            </label>
          </li>
        ))}
      </ul>
    </>
  );
};

export default Home;
