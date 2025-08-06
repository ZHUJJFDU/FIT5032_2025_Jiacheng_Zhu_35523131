<template>
  <div class="container mt-5">
    <div class="row justify-content-center">
      <div class="col-md-6">
        <div class="card">
          <div class="card-header">
            <h3 class="text-center">Add Book</h3>
          </div>
          <div class="card-body">
            <form @submit.prevent="addBook">
              <div class="mb-3">
                <label for="isbn" class="form-label">ISBN:</label>
                <input 
                  type="number" 
                  class="form-control" 
                  id="isbn" 
                  v-model="isbn" 
                  placeholder="Enter ISBN"
                  required
                >
              </div>
              <div class="mb-3">
                <label for="name" class="form-label">Name:</label>
                <input 
                  type="text" 
                  class="form-control" 
                  id="name" 
                  v-model="name" 
                  placeholder="Enter book name"
                  required
                >
              </div>
              <div class="d-grid">
                <button 
                  type="submit" 
                  class="btn btn-primary"
                >
                  Add Book
                </button>
              </div>
            </form>
            

          </div>
        </div>
      </div>
    </div>
    
    <!-- BookList Component -->
    <div class="row mt-5">
      <div class="col-md-12">
        <BookList />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { collection, addDoc } from 'firebase/firestore'
import db from '../firebase/init.js'
import BookList from '../components/BookList.vue'

const isbn = ref('')
const name = ref('')

const addBook = async () => {
  try {
    const isbnNumber = Number(isbn.value)
    if (isNaN(isbnNumber)) {
      alert('ISBN must be a valid number')
      return
    }
    
    await addDoc(collection(db, 'books'), {
      isbn: isbnNumber,
      name: name.value
    })
    
    isbn.value = ''
    name.value = ''
    alert('Book added successfully!')
  } catch (error) {
    console.error('Error adding book: ', error)
  }
}
</script>

<style scoped>
.card {
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}
</style> 