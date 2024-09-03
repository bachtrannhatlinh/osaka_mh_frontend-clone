import styled from 'styled-components'

const UserNoticationStyled = styled.div`
  ul {
    .item-active {
      background-color: #121520;
      .item-seen {
        position: relative;
        display: block;
        padding: 0.5rem 1rem;
        color: #212529;
        text-decoration: none;
        background-color: gray;
        border-bottom: solid 1px black;
      }
    }

    li {
      list-style-type: none;
    }

    .active-item {
      background-color: #121520;
      .item-not-seen {
        position: relative;
        display: block;
        padding: 0.5rem 1rem;
        color: #212529;
        text-decoration: none;
        background-color: white;
        border-bottom: solid 1px black;
      }
    }

    .claim {
      background-color: #008cba;
      border: none;
      color: white;
      text-align: center;
      text-decoration: none;
      display: inline-block;
      font-size: 16px;
    }

    .delete {
      background-color: #f44336;
      border: none;
      color: white;
      text-align: center;
      text-decoration: none;
      display: inline-block;
      font-size: 16px;
    }

    .read {
      background-color: #dda0dd;
      border: none;
      color: white;
      text-align: center;
      text-decoration: none;
      display: inline-block;
      font-size: 16px;
    }

    .read-all {
      background-color: #4caf50;
      border: none;
      color: white;
      text-align: center;
      text-decoration: none;
      display: inline-block;
      font-size: 16px;
    }
  }
`

export default UserNoticationStyled
