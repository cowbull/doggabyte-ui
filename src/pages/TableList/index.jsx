import { CalculatorFilled, PlusOutlined } from '@ant-design/icons';
import { Button, message, Input, Drawer } from 'antd';
import React, { useState, useRef } from 'react';
import { useIntl, FormattedMessage } from 'umi';
import { PageContainer, FooterToolbar } from '@ant-design/pro-layout';
import ProTable from '@ant-design/pro-table';
import { ModalForm, ProFormText, ProFormTextArea } from '@ant-design/pro-form';
import ProDescriptions from '@ant-design/pro-descriptions';
import UpdateForm from './components/UpdateForm';
import { rule, addRule, updateRule, removeRule } from '@/services/ant-design-pro/api';

/* @en-US Add node
 * @zh-CN 添加节点
 * @param fields
 */

const handleAdd = async (fields) => {
  const hide = message.loading('正在添加');

  try {
    await addRule({ ...fields });
    hide();
    message.success('Added successfully');
    return true;
  } catch (error) {
    hide();
    message.error('Adding failed, please try again!');
    return false;
  }
};
/**
 * @en-US Update node
 * @zh-CN 更新节点
 *
 * @param fields
 */

const handleUpdate = async (fields) => {
  const hide = message.loading('Configuring');

  try {
    await updateRule({
      name: fields.name,
      desc: fields.desc,
      key: fields.key,
    });
    hide();
    message.success('Configuration is successful');
    return true;
  } catch (error) {
    hide();
    message.error('Configuration failed, please try again!');
    return false;
  }
};
/**
 *  Delete node
 * @zh-CN 删除节点
 *
 * @param selectedRows
 */

const handleRemove = async (selectedRows) => {
  const hide = message.loading('正在删除');
  if (!selectedRows) return true;

  try {
    await removeRule({
      key: selectedRows.map((row) => row.key),
    });
    hide();
    message.success('Deleted successfully and will refresh soon');
    return true;
  } catch (error) {
    hide();
    message.error('Delete failed, please try again');
    return false;
  }
};

const TableList = () => {
  /**
   * @en-US Pop-up window of new window
   * @zh-CN 新建窗口的弹窗
   *  */
  const [createModalVisible, handleModalVisible] = useState(false);
  /**
   * @en-US The pop-up window of the distribution update window
   * @zh-CN 分布更新窗口的弹窗
   * */

  const [updateModalVisible, handleUpdateModalVisible] = useState(false);
  const [showDetail, setShowDetail] = useState(false);
  const actionRef = useRef();
  const [currentRow, setCurrentRow] = useState();
  const [selectedRowsState, setSelectedRows] = useState([]);
  /**
   * @en-US International configuration
   * @zh-CN 国际化配置
   * */

  const intl = useIntl();
  const columns = [
    {
      title: '订单编号',
      dataIndex: 'orderNo',
      sorter: true,
      // tip: 'This is the unique key',
      render: (dom, entity) => {
        return (
          <a
            onClick={() => {
              setCurrentRow(entity);
              setShowDetail(true);
            }}
          >
            {dom}
          </a>
        );
      },
    },
    {
      title: '商户名称',
      dataIndex: 'merchantName',
      sorter: true,
      hideInForm: true,
    },
    {
      title: '点位名称',
      dataIndex: 'storeName',
      sorter: true,
      hideInForm: true,
    },
    {
      title: '货柜名称',
      dataIndex: 'sbmcName',
      sorter: true,
      hideInForm: true,
    },
    {
      title: '下单时间',
      sorter: true,
      dataIndex: 'createTime',
      valueType: 'dateTime',
      hideInForm: false,
      renderFormItem: (item, { defaultRender, ...rest }, form) => {
        const status = form.getFieldValue('status');
        // if (`${status}` === '0') {
        //   return false;
        // }

        // if (`${status}` === '3') {
        //   return (
        //     <Input
        //       {...rest}
        //       placeholder={intl.formatMessage({
        //         id: 'pages.searchTable.exception',
        //         defaultMessage: 'Please enter the reason for the exception!',
        //       })}
        //     />
        //   );
        // }

        return defaultRender(item);
      },
    },
    {
      title: '订单状态',
      dataIndex: 'orderStatus',
      sorter: true,
      hideInForm: true,
      valueEnum: {
        0: {
          text: '已完成',
          status: 'Success',
        },
        1: {
          text: '支付失败',
          status: 'Error',
        },
      },
    },
    {
      title: '售后状态',
      dataIndex: 'postSaleStatus',
      sorter: true,
      valueEnum: {
        0: {
          text: '已完成',
          status: 'Success',
        },
        1: {
          text: '待检查',
          status: 'Processing',
        },
        2: {
          text: '拒绝受理',
          status: 'Error',
        },
        3: {
          text: '取消',
          status: 'Default',
        },
      },
    },
    {
      title: '用户编号',
      dataIndex: 'userId',
      sorter: true,
      hideInTable: true,
      // hideInForm: true,
    },
    {
      title: '币种',
      dataIndex: 'currency',
      sorter: true,
      hideInTable: true,
      hideInForm: true,
    },
    {
      title: '订单金额(¥)',
      dataIndex: 'paymentAmount',
      sorter: true,
      hideInForm: false,
    },
    {
      title: '视频片段',
      dataIndex: 'video',
      sorter: true,
      hideInTable: true,
      hideInForm: false,
      hideInSearch: true,
    },
    {
      title: <FormattedMessage id="pages.searchTable.titleOption" defaultMessage="Operating" />,
      dataIndex: 'option',
      valueType: 'option',
      // render: (_, record) => [
      //   <a
      //     key="config"
      //     onClick={() => {
      //       // handleUpdateModalVisible(true);
      //       setCurrentRow(record);
      //     }}
      //   >
      //     <FormattedMessage id="pages.searchTable.config" defaultMessage="Configuration" />
      //   </a>,
      // ],
    },
  ];
  const columnsDetail = [
    {
      title: '订单编号',
      dataIndex: 'orderNo',
      sorter: true,
    },
    {
      title: '商户名称',
      dataIndex: 'merchantName',
      sorter: true,
      hideInForm: true,
    },
    {
      title: '点位名称',
      dataIndex: 'storeName',
      sorter: true,
      hideInForm: true,
    },
    {
      title: '货柜名称',
      dataIndex: 'sbmcName',
      sorter: true,
      hideInForm: true,
    },
    {
      title: '下单时间',
      sorter: true,
      dataIndex: 'createTime',
      valueType: 'dateTime',
      hideInForm: false,
      renderFormItem: (item, { defaultRender, ...rest }, form) => {
        const status = form.getFieldValue('status');
        return defaultRender(item);
      },
    },
    {
      title: '订单状态',
      dataIndex: 'orderStatus',
      sorter: true,
      hideInForm: true,
      valueEnum: {
        0: {
          text: '已完成',
          status: 'Success',
        },
        1: {
          text: '支付失败',
          status: 'Error',
        },
      },
    },
    {
      title: '售后状态',
      dataIndex: 'postSaleStatus',
      sorter: true,
      valueEnum: {
        0: {
          text: '已完成',
          status: 'Success',
        },
        1: {
          text: '待检查',
          status: 'Processing',
        },
        2: {
          text: '拒绝受理',
          status: 'Error',
        },
        3: {
          text: '取消',
          status: 'Default',
        },
      },
    },
    {
      title: '用户编号',
      dataIndex: 'userId',
      sorter: true,
      hideInTable: true,
      // hideInForm: true,
    },
    {
      title: '币种',
      dataIndex: 'currency',
      sorter: true,
      hideInTable: true,
      hideInForm: true,
    },
    {
      title: '订单金额(¥)',
      dataIndex: 'paymentAmount',
      sorter: true,
      hideInForm: false,
    },
    {
      title: '视频片段',
      dataIndex: 'video',
      sorter: true,
      hideInTable: true,
      hideInForm: false,
      render: (_, record) => {
        return (
          <video
            controls
            crossOrigin="anonymous"
            autoPlay
            name="media"
            preload="auto"
            width={'800px'}
          >
            <source type="video/mp4" src={'http://120.131.5.141:9000/ifreezer/test.mp4'} />
          </video>
        );
      },
    },
    {
      title: <FormattedMessage id="pages.searchTable.titleOption" defaultMessage="Operating" />,
      dataIndex: 'option',
      valueType: 'option',
      render: (_, record) => [
        <a
          key="config"
          onClick={() => {
            handleUpdateModalVisible(true);
            setCurrentRow(record);
          }}
        >
          <FormattedMessage id="pages.searchTable.config" defaultMessage="Configuration" />
        </a>,
      ],
    },
  ];
  return (
    <PageContainer>
      <ProTable
        headerTitle={intl.formatMessage({
          id: 'pages.searchTable.title',
          defaultMessage: 'Enquiry form',
        })}
        actionRef={actionRef}
        rowKey="key"
        search={{
          labelWidth: 120,
        }}
        toolBarRender={() => [
          <Button
            type="primary"
            key="primary"
            onClick={() => {
              handleModalVisible(true);
            }}
          >
            <PlusOutlined /> <FormattedMessage id="pages.searchTable.new" defaultMessage="New" />
          </Button>,
        ]}
        request={rule}
        columns={columns}
        rowSelection={{
          onChange: (_, selectedRows) => {
            setSelectedRows(selectedRows);
          },
        }}
      />
      {selectedRowsState?.length > 0 && (
        <FooterToolbar
          extra={
            <div>
              <FormattedMessage id="pages.searchTable.chosen" defaultMessage="Chosen" />{' '}
              <a
                style={{
                  fontWeight: 600,
                }}
              >
                {selectedRowsState.length}
              </a>{' '}
              <FormattedMessage id="pages.searchTable.item" defaultMessage="项" />
              &nbsp;&nbsp;
              <span>
                <FormattedMessage
                  id="pages.searchTable.totalServiceCalls"
                  defaultMessage="Total number of service calls"
                />{' '}
                {selectedRowsState.reduce((pre, item) => pre + item.callNo, 0)}{' '}
                <FormattedMessage id="pages.searchTable.tenThousand" defaultMessage="万" />
              </span>
            </div>
          }
        >
          <Button
            onClick={async () => {
              await handleRemove(selectedRowsState);
              setSelectedRows([]);
              actionRef.current?.reloadAndRest?.();
            }}
          >
            <FormattedMessage
              id="pages.searchTable.batchDeletion"
              defaultMessage="Batch deletion"
            />
          </Button>
          <Button type="primary">
            <FormattedMessage
              id="pages.searchTable.batchApproval"
              defaultMessage="Batch approval"
            />
          </Button>
        </FooterToolbar>
      )}
      <ModalForm
        title={intl.formatMessage({
          id: 'pages.searchTable.createForm.newRule',
          defaultMessage: 'New rule',
        })}
        width="400px"
        visible={createModalVisible}
        onVisibleChange={handleModalVisible}
        onFinish={async (value) => {
          const success = await handleAdd(value);

          if (success) {
            handleModalVisible(false);

            if (actionRef.current) {
              actionRef.current.reload();
            }
          }
        }}
      >
        <ProFormText
          rules={[
            {
              required: true,
              message: (
                <FormattedMessage
                  id="pages.searchTable.ruleName"
                  defaultMessage="Rule name is required"
                />
              ),
            },
          ]}
          width="md"
          name="name"
        />
        <ProFormTextArea width="md" name="desc" />
      </ModalForm>
      <UpdateForm
        onSubmit={async (value) => {
          const success = await handleUpdate(value);

          if (success) {
            handleUpdateModalVisible(false);
            setCurrentRow(undefined);

            if (actionRef.current) {
              actionRef.current.reload();
            }
          }
        }}
        onCancel={() => {
          handleUpdateModalVisible(false);

          if (!showDetail) {
            setCurrentRow(undefined);
          }
        }}
        updateModalVisible={updateModalVisible}
        values={currentRow || {}}
      />

      <Drawer
        width={'70%'}
        visible={showDetail}
        onClose={() => {
          setCurrentRow(undefined);
          setShowDetail(false);
        }}
        closable={false}
      >
        {/* <video id="background-video" controls="controls" autoPlay name="media" width={'100%'}>
                <source type="video/mp4" src={'./test.mp4'}/>
         </video> */}
        {currentRow?.orderNo && (
          <ProDescriptions
            column={2}
            title={currentRow?.orderNo}
            request={async () => ({
              data: currentRow || {},
            })}
            params={{
              id: currentRow?.orderNo,
            }}
            columns={columnsDetail}
          />
        )}
      </Drawer>
    </PageContainer>
  );
};

export default TableList;
