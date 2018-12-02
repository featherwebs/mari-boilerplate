@extends('featherwebs::admin.layout')

@section('content')
  @component('featherwebs::admin.template.default')
    @slot('heading')
      <h2 class="mdl-card__title-text">{{ str_plural($postType->title) }}</h2>
    @endslot
    @slot('breadcrumb')
      <nav aria-label="breadcrumb" role="navigation">
        <ol class="breadcrumb">
          <li class="breadcrumb-item" aria-current="page"><a href="{{ route('admin.home') }}">Home</a></li>
          <li class="breadcrumb-item active" aria-current="page">{{ str_plural($postType->title) }}</li>
        </ol>
      </nav>
    @endslot
    <div>
      <div class="panel">
        <table id="page-datatable" class="mdl-data-table" width="100%">
          <thead>
          <th>Id</th>
          <th>Name</th>
          <th>Email</th>
          <th>Actions</th>
          </thead>
          <tbody>
          </tbody>
        </table>
      </div>
    </div>
  @endcomponent
@endsection

@push('styles')
  <link href="https://cdn.datatables.net/1.10.16/css/dataTables.material.min.css" rel="stylesheet">
@endpush

@push('scripts')
  <script type="text/javascript" src="https://cdn.datatables.net/v/bs/dt-1.10.16/datatables.min.js"></script>
  <script type="text/javascript" src="https://cdn.datatables.net/1.10.16/js/dataTables.material.min.js"></script>
  <script>
    $(document).ready(function() {
      $('#page-datatable').DataTable({
        processing: true,
        serverSide: true,
        ajax: {
          type: 'POST',
          url: '/api/post',
          data: { _token: $('meta[name="csrf-token"]').attr('content'), 'post_type': '{{ $postType->slug }}' }
        },
        columns:[
          {data: 'id', name: 'id'},
          {data: 'sub_title', name: 'sub_title'},
          {data: 'title', name: 'title'},
          {data: 'slug',name: 'slug', searchable:false, orderable:false, render: function(data,meta,row){
              var actions = '<form method="POST" action="/admin/post/'+ data +'">';
              actions += '<input type="hidden" name="_method" value="DELETE">';
              actions += '<input type="hidden" name="_token" value="'+$('[name=csrf-token]').attr('content')+'">';
            @permission('delete-post')
              actions += '<button onclick="return confirm(\'Are you sure?\')" class="mdl-button mdl-js-button mdl-color-text--red" title="Delete"><i class="material-icons">delete</i></button>';
            @endpermission
              actions += '</form>';

              return actions;
            }}
        ],
        columnDefs: [
          {
            targets: [ 0, 1, 2 ],
            className: 'mdl-data-table__cell--non-numeric'
          }
        ]
      });
    });
  </script>
@endpush