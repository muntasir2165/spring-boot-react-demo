import React, { Component } from 'react';
import Container from './Container';
import Footer from './Footer';
import AddStudentForm from './forms/AddStudentForm';
import './App.css';
import { getAllStudents } from './client';
import { errorNotification } from './Notification';
import { Avatar, Modal, Spin, Table } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

const getIndicatorIcon = () => (
  <LoadingOutlined style={{ fontSize: 24 }} spin />
);

class App extends Component {
  state = {
    isAddStudentModalVisible: false,
    isFetching: false,
    students: [],
  };

  componentDidMount() {
    this.fetchStudents();
  }

  openAddStudentModal = () => this.setState({ isAddStudentModalVisible: true });

  closeAddStudentModal = () =>
    this.setState({ isAddStudentModalVisible: false });

  fetchStudents = () => {
    this.setState({ isFetching: true });
    getAllStudents()
      .then((res) =>
        res.json().then((students) => {
          console.log(students);
          this.setState({ isFetching: false, students });
        })
      )
      .catch((error) => {
        // console.log(error.error.message); // console logs an empty string - "". Hence, I commented it out and console logged error.response.statusText in the following line
        console.log(error.error);
        const message = error.response.statusText;
        const description = error.response.statusText;
        errorNotification(message, description);
        this.setState({ isFetching: false });
      });
  };

  render() {
    const { isAddStudentModalVisible, isFetching, students } = this.state;

    if (isFetching) {
      return (
        <Container>
          <Spin indicator={getIndicatorIcon()} />
        </Container>
      );
    }

    if (students && students.length) {
      const columns = [
        {
          title: '',
          key: 'avatar',
          render: (text, student) => (
            <Avatar size='large'>{`${student.firstName
              .charAt(0)
              .toUpperCase()} ${student.lastName
              .charAt(0)
              .toUpperCase()}`}</Avatar>
          ),
        },
        {
          title: 'Student Id',
          dataIndex: 'studentId',
          key: 'studentId',
        },
        {
          title: 'First Name',
          dataIndex: 'firstName',
          key: 'firstName',
        },
        {
          title: 'Last Name',
          dataIndex: 'lastName',
          key: 'lastName',
        },
        {
          title: 'Email',
          dataIndex: 'email',
          key: 'email',
        },
        {
          title: 'Gender',
          dataIndex: 'gender',
          key: 'gender',
        },
      ];

      return (
        <Container>
          <Table
            dataSource={students}
            columns={columns}
            pagination={false}
            rowKey='studentId'
            style={{ paddingBottom: '100px' }}
          />
          <Modal
            title='Add new student'
            visible={isAddStudentModalVisible}
            onOk={this.closeAddStudentModal}
            onCancel={this.closeAddStudentModal}
            width={1000}
          >
            <AddStudentForm
              onSuccess={() => {
                this.closeAddStudentModal();
                this.fetchStudents();
              }}
            />
          </Modal>
          <Footer
            numberOfStudents={students.length}
            handleAddStudentClickEvent={this.openAddStudentModal}
          />
        </Container>
      );
    }

    return <h1>No Students Found</h1>;
  }
}

export default App;
