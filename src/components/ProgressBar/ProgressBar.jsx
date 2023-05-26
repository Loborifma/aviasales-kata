import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import './ProgressBar.scss';
import { Progress } from 'antd';

export const ProgressBar = () => {
  const progress = useSelector((state) => {
    const { countPack } = state.ticketListReducer;
    const progressPercent = JSON.parse(JSON.stringify(countPack)) * 5;
    return progressPercent;
  });

  const [isShow, setIsShow] = useState(false);

  useEffect(() => {
    if (progress >= 100) {
      setIsShow(true);
    }
  }, [progress]);

  return (
    <Progress
      className={`progress-bar ${isShow && 'visually-hidden'}`}
      percent={progress}
      status="active"
      showInfo={false}
    />
  );
};
