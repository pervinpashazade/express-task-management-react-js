import Login from "./components/pages/Login";
import Signup from "./components/pages/Signup";
import SignupCreateCompany from "./components/pages/CompanyCreate";

import AdminDashboard from './components/pages/Admin/Dashboard';
import AdminEmployeeList from './components/pages/Admin/EmployeeList';
import AdminEmpoyeeCreate from './components/pages/Admin/EmployeeCreate';
import AdminTaskCreate from './components/pages/Admin/TaskCreate';
import AdminTaskList from './components/pages/Admin/TaskList';
import AdminTaskView from './components/pages/Admin/TaskView';
import AdminTaskEdit from './components/pages/Admin/TaskEdit';

import OperatorDashboard from './components/pages/Operator/Dashboard';
import OperatorTaskList from './components/pages/Operator/TaskList';
import OperatorTaskView from './components/pages/Operator/TaskView';
import OperatorTaskListOwn from './components/pages/Operator/TaskListOwn';

export const routes = {
  "PUBLIC": [
    {
      path: "/",
      component: Login,
      exact: true
    }, {
      path: "/login",
      component: Login,
      exact: true
    }, {
      path: "/signup",
      component: Signup,
      exact: true
    }, {
      path: "/signup/create-company",
      component: SignupCreateCompany,
      exact: true
    },
  ],
  "Admin": [
    {
      path: "/",
      component: AdminDashboard,
      exact: true
    }, {
      path: "/dashboard",
      component: AdminDashboard,
      exact: true
    }, {
      path: "/employee/list",
      component: AdminEmployeeList,
      exact: true
    }, {
      path: "/employee/create",
      component: AdminEmpoyeeCreate,
      exact: true
    }, {
      path: "/employee/:id",
      component: null,
      exact: true
    }, {
      path: "/task/list",
      component: AdminTaskList,
      exact: true
    }, {
      path: "/task/create",
      component: AdminTaskCreate,
      exact: true
    }, {
      path: "/task/view/:id",
      component: AdminTaskView,
      exact: true
    }, {
      path: "/task/edit/:id",
      component: AdminTaskEdit,
      exact: true
    },
  ],
  "Operator": [
    {
      path: "/",
      component: OperatorDashboard,
      exact: true
    }, {
      path: "/task/list",
      component: OperatorTaskList,
      exact: true
    }, {
      path: "/task/view/:id",
      component: OperatorTaskView,
      exact: true
    }, {
      path: "/task/me/assigned",
      component: OperatorTaskListOwn,
      exact: true
    },
  ]
}
