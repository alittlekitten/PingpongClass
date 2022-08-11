import { css } from '@emotion/react';
import defaultProfile from '@assets/images/defaultProfile.jpeg';
import { useAppSelector } from '@src/store/hooks';
import { useEffect, useState } from 'react';
import Ranking from './Ranking';

const Myinfo = () => {
  const memberStore = useAppSelector((state) => state.member);
  const [totalRate, setTotalRate] = useState(0 as number);
  const [currentRate, setcurrentRate] = useState(0 as number);
  const [levelImg, setLevelImg] = useState('');

  useEffect(() => {
    setTotalRate(
      (memberStore.totalPoint /
        (memberStore.totalPoint + memberStore.levelPoint)) *
        100,
    );
    setcurrentRate(
      (memberStore.point / (memberStore.totalPoint + memberStore.levelPoint)) *
        100,
    );

    setLevelImg('/levels/' + memberStore.currentLevel + '.png');
  }, [memberStore]);

  return (
    <div css={totalContainer}>
      <div
        css={css`
          width: 100%;
        `}
      >
        <div className="infoContainer">
          {memberStore.profileFullPath ===
            'https://test-ppc-bucket.s3.ap-northeast-2.amazonaws.com/null' ||
          memberStore.profileFullPath ===
            'https://test-ppc-bucket.s3.ap-northeast-2.amazonaws.com/' ? (
            <img
              src={defaultProfile}
              alt="기본프로필사진"
              className="profile-logo"
            />
          ) : (
            <img
              src={memberStore.profileFullPath}
              alt="지정된프로필사진"
              className="profile-logo"
            />
          )}
          <div className="nameContainer">
            <h2>{memberStore.name} 학생</h2>
            <p>
              [{memberStore.nextLevel}] 까지 {memberStore.levelPoint} 퐁퐁
              남았어요 !
            </p>
          </div>
        </div>
        <div className="levelContainer">
          <div className="level-div">
            <img src={levelImg} alt="" className="level-img" />
            <div>
              <h2 className="level">{memberStore.currentLevel}</h2>
            </div>
          </div>
          <div className="stickerContainer">
            <div className="soFarSticker" style={{ width: `${totalRate}%` }}>
              <span>{memberStore.totalPoint}</span>
            </div>
            <div
              className="currentSticker"
              style={{ width: `${currentRate}%` }}
            >
              <span>{memberStore.point}</span>
            </div>
          </div>
        </div>
      </div>
      <div className="rankingContainer">
        <p style={{ width: '100%', fontWeight: '700' }}>실시간 순위</p>
        <div className="myRanking">
          <div className="rankingInfo">
            <div className="rankBox">{memberStore.myRank}위</div>
            <div className="nameBox">{memberStore.name}</div>
            <div className="myBio">
              {memberStore.introduce
                ? memberStore.introduce
                : '자기소개가 없습니다.'}
            </div>
          </div>
          <button>수정하기</button>
        </div>
        <br />
        <p style={{ width: '100%', fontWeight: '700' }}>
          랭킹(매일 오전 8시 기준)
        </p>
        <Ranking />
      </div>
    </div>
  );
};

const totalContainer = css`
  width: 100%;
  height: 100%;
  background: #ffffff;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: start;
  border-radius: 20px;
  padding: 50px;
  box-shadow: 2px 2px 15px -5px;
  box-sizing: border-box;

  .infoContainer {
    width: 100%;
    height: 30%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: start;
  }
  .infoContainer img {
    display: inline-block;
    height: 80px;
    border-radius: 50px;
    cursor: pointer;
    transition: all 0.1s ease-in-out;
  }
  .infoContainer img:hover {
    transform: scale(1.2);
  }
  .nameContainer {
    margin-left: 20px;
  }
  .rankBox {
    width: 50px;
  }
  .myBio {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: center;
  }
  .nameBox {
    width: 100px;
    display: flex;
    flex-direction: row;
    justify-content: end;
  }

  .levelContainer {
    width: 100%;
    height: 70px;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    justify-content: space-between;
  }

  .rankingContainer {
    width: 100%;
    height: 50%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  .ranking {
    width: 100%;
    height: 40px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    transition: all 0.1s ease-in-out;
  }
  .ranking:hover {
    transform: scale(1.04);
  }

  .rankingLow {
    width: 100%;
    height: 40px;
    background-color: #f2f2f2;
    border-top: #d0d0d0 1px solid;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    transition: all 0.1s ease-in-out;
  }

  .myRanking {
    width: 100%;
    height: 40px;
    background-color: #f1f5ff;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    transition: all 0.1s ease-in-out;
  }

  .rankingLow:hover {
    transform: scale(1.04);
  }

  .rankingInfo {
    width: 80%;
    display: flex;
    flex-direction: row;
    align-items: center;
  }

  .level {
    margin: 0;
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: end;
  }

  .stickerContainer {
    position: relative;
    width: 100%;
    height: 30px;
    border-radius: 20px;
    background-color: #d1d1d1;
  }
  .soFarSticker {
    position: relative;
    height: 100%;
    background-color: #ffe790;
    border-radius: 20px;
    z-index: 1;
    text-align: right;
    animation: barIn2 0.6s;
  }
  .currentSticker {
    position: absolute;
    top: 0;
    height: 100%;
    background-color: #fdb878;
    border-radius: 20px;
    z-index: 99;
    animation: barIn 0.6s;
    text-align: right;
  }
  span {
    padding-right: 10px;
    height: 30px;
    width: 30px;
    font-weight: 700;
    color: #701267;
  }

  img {
    border: 1px solid gray;
    border-radius: 100px;
    width: 80px;
    height: 30%;
  }

  .level-div {
    display: flex;
    flex-direction: row;
    margin-right: 13px;
  }

  .level-img {
    border: none;
    height: 100%;
    width: 29px;
    margin-right: 6px;
  }

  @keyframes barIn {
    from {
      width: 0%;
    }
    to {
      width: 50%;
    }
  }

  @keyframes barIn2 {
    from {
      width: 0%;
    }
    to {
      width: 70%;
    }
  }
`;

export default Myinfo;
