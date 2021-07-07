import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import request from 'umi-request';
import { Select, Input } from 'antd';
import styles from './index.less';

const Logistics = (props) => {
  let { schema = {}, value = '', onChange } = props;
  const [options, setOptions] = useState([]);
  const initPageSource = async () => {
    const { data = [] } = await request(
      '/qy/gdfw/workOrder/queryExpressCompanies',
      {
        method: 'get',
        params: {
          apiName: 'queryExpressCompanies',
        },
      },
    );
    const formatData = data.map((item) => ({
      label: item.name,
      value: item.code,
    }));
    setOptions(formatData);
  };
  useEffect(() => {
    initPageSource();
  }, []);
  try {
    value = JSON.parse(value);
  } catch (e) {
    console.error('JSON 解析异常', e);
    value = {};
  }

  const { show } = schema;
  const handleInputChange = (e) => {
    const { value: val } = e.target;
    typeof onChange === 'function' &&
      onChange(
        JSON.stringify({
          ...value,
          order: val,
        }),
      );
  };

  const handelSelectChange = (val) => {
    typeof onChange === 'function' &&
      onChange(
        JSON.stringify({
          ...value,
          company: val,
        }),
      );
  };

  if (show === 'all') {
    return (
      <div className={styles.logistics}>
        <Select
          placeholder="物流公司"
          onChange={handelSelectChange}
          defaultValue={value.company}
          style={{ width: '170px' }}
          options={options}
          showSearch
          filterOption={(input, option) => option.label.includes(input)}
        />
        <Input
          placeholder="物流单号"
          className={styles.logisticsInput}
          onChange={handleInputChange}
          defaultValue={value.order}
          style={{ width: '162px', marginLeft: '8px' }}
        />
      </div>
    );
  }

  if (show === 'company') {
    return (
      <Select
        placeholder="物流公司"
        onChange={handelSelectChange}
        defaultValue={value.company}
      />
    );
  }

  return (
    <Input
      placeholder="物流单号"
      onChange={handleInputChange}
      defaultValue={value.order}
    />
  );
};

Logistics.propTypes = {
  /**
   * @title 展示
   * @description 请选择显示组件
   * @enumNames ['全部显示', '仅显示物流公司', '仅显示物流单号']
   *
   **/
  show: PropTypes.oneOf(['all', 'company', 'order']),
};
Logistics.defaultProps = {
  show: 'all',
};

export default Logistics;
