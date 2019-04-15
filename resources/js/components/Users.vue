<template>
    <div class="container">
        <div class="row mt-5" v-if="$gate.isAdminOrAuthor()">
            <div class="col-mid-12">
                <div class="card">
                    <div class="card-header">
                        <h3 class="card-title">Users</h3>

                        <div class="card-tools">
                            <button class="btn btn-success" @click="newModel"><i class="fa fa-user-plus fa-fw"></i></button>
                        </div>
                    </div>
                    <!-- /.card-header -->
                    <div class="card-body table-responsive p-0">
                        <table class="table table-hover">
                            <tbody>
                                <tr>
                                    <th>ID</th>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Type</th>
                                    <th>Registered at</th>
                                    <th>Modify</th>
                                </tr>
                                <tr v-for="user in users" :key="user.id">
                                    <td>{{user.id}}</td>
                                    <td>{{user.name}}</td>
                                    <td>{{user.email}}</td>
                                    <td>{{user.type | upText}}</td>
                                    <td>{{user.created_at | formattedDate}}</td>
                                    <td>
                                        <a href="#" @click="editModel(user)"> <i class="fa fa-edit blue"></i></a> |
                                        <a href="#" @click="deleteUser(user.id)"> <i class="fa fa-trash red"></i></a>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <!-- /.card-body -->
                </div>
                <!-- /.card -->
            </div>
        </div>

        <div v-if="!$gate.isAdminOrAuthor()">
            <not-found></not-found>
        </div>
        
        <!-- Modal -->
        <div class="modal fade" id="addNew" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" v-show="!editMode" id="exampleModalLabel">Add New User</h5>
                        <h5 class="modal-title" v-show="editMode" id="exampleModalLabel">Update User</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <form @submit.prevent="editMode ? updateUser() :createUser()">
                        <div class="modal-body">
                            <div class="form-group">
                                <input v-model="form.name" type="text" name="name"
                                    placeholder="Name"
                                    class="form-control" :class="{ 'is-invalid': form.errors.has('name') }">
                                <has-error :form="form" field="name"></has-error>
                            </div>
                            
                            <div class="form-group">
                                <input v-model="form.email" type="email" name="email"
                                    placeholder="E-mail Address"
                                    class="form-control" :class="{ 'is-invalid': form.errors.has('email') }">
                                <has-error :form="form" field="email"></has-error>
                            </div>
                            
                            <div class="form-group">
                                <textarea v-model="form.bio" name="bio"
                                    placeholder="Short bio for user (Optional)"
                                    class="form-control" :class="{ 'is-invalid': form.errors.has('bio') }"> 
                                </textarea>
                                <has-error :form="form" field="bio"></has-error>
                            </div>

                            <div class="form-group">
                                <select name="type" v-model="form.type" id="type" class="form-control"
                                :class="{'is-invalid': form.errors.has('type')}"
                                >
                                    <option value=""> Select User Role</option>
                                    <option value="admin">Admin</option>
                                    <option value="user">Standrad User</option>
                                    <option value="author">Author</option>
                                </select>
                                <has-error :form="form" field="type"></has-error>
                            </div>

                            <div class="form-group">
                                <input v-model="form.password" type="password" name="password"
                                    class="form-control" :class="{ 'is-invalid': form.errors.has('password') }">
                                <has-error :form="form" field="password"></has-error>
                            </div>

                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-danger" data-dismiss="modal">Close</button>
                            <button v-show="editMode" type="submit" class="btn btn-success">Update</button>
                            <button v-show="!editMode" type="submit" class="btn btn-primary">Create</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
    export default {
        
        data () {
            return {
                editMode              : false,
                users                   : {},
                // Create a new form instance
                form: new Form({
                    id                  : '',
                    name                : '',
                    password            : '',
                    email               : '',
                    type                : '',
                    bio                 : '',
                    photo               : ''

                })
            }
        },

        name: 'Users',
        
        computed: {

        },
        methods: {

            updateUser(){
                this.$Progress.start();
                this.form.put('api/user/'+this.form.id)
                .then(()=>{
                     $('#addNew').modal('hide');
                    swal.fire(
                            'Updated!',
                            'User information has been updated', 
                            'success'
                            );
                    this.$Progress.finish();
                    Fire.$emit('afterUserAction');
                })
                .catch(()=>{
                    this.$Progress.fail();
                });
            },

            editModel(user){
                this.editMode           = true;
                this.form.reset();
                $('#addNew').modal('show');
                this.form.fill(user);  //set the data of the clicked user
            },

            
            newModel(){
                this.editMode           = false;
                this.form.reset();
                $('#addNew').modal('show');
            },



            deleteUser(id){
                //Sweet alert Start
                swal.fire({
                title: 'Are you sure?',
                text: "You won't be able to revert this!",
                type: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, delete it!'
                }).then((result) => {
                    if (result.value) {
                        //ajax request to delete Start
                        this.form.delete('api/user/'+id) //php artisan route:list then we can find the link as method DELETE
                        .then(()=>{
                            swal.fire(
                            'Deleted!',
                            'Your file has been deleted.', 
                            'success'
                            );
                            Fire.$emit('afterUserAction');
                        })
                        .catch(()=>{
                            swal('Failed!', 'There was something wrong.', 'warning');
                        }); 
                        //ajax request to delete End
                    }
                    
                })
                //Sweet alert End
            },
            loadUsers(){
                if(this.$gate.isAdminOrAuthor()){
                    this.$Progress.start();
                    axios.get('api/user')
                    .then(({data}) => {
                        this.users = data.data;
                        this.$Progress.finish();
                    })
                    .catch(()=>{
                        this.$Progress.fail();
                    })
                } 
                
            },
            createUser(){
                this.$Progress.start();

                this.form.post('api/user')
                .then(()=>{
                    Fire.$emit('afterUserAction'); //custom event : after creating the user it will load

                    $('#addNew').modal('hide');

                    Toast.fire({
                    type: 'success',
                    title: 'User Created successfully'
                    });

                    this.$Progress.finish();
                })
                .catch(()=>{
                    this.$Progress.fail();
                })
                ;

                
            }
        },
        // created works like did mount in react
        created(){
            this.loadUsers();
            //setInterval(()=>this.loadUsers(), 3000); //every after 3 second this api will be calling

            Fire.$on('afterUserAction', ()=>{this.loadUsers()}); //calling the custom event and fired the event
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
   
</style>
