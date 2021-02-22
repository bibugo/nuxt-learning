<template>
  <v-container fluid fill-height align-start pa-0>
    <v-navigation-drawer v-model="showDrawer" :width="showDrawer ? 256 : 0">
      <template v-slot:prepend>
        <v-toolbar dense flat>
          <v-toolbar-title> 字段 </v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn icon v-if="batchFields.length > 0">
            <v-icon color="error">mdi-trash-can-outline</v-icon>
          </v-btn>
          <v-speed-dial
            v-model="fab"
            direction="bottom"
            transition="slide-y-transition"
          >
            <template v-slot:activator>
              <v-btn v-model="fab" elevation="0" icon small fab>
                <v-icon v-if="fab"> mdi-close </v-icon>
                <v-icon v-else> mdi-server-plus </v-icon>
              </v-btn>
            </template>
            <v-btn fab dark small color="green">
              <v-icon>mdi-pencil</v-icon>
            </v-btn>
            <v-btn fab dark small color="indigo">
              <v-icon>mdi-plus</v-icon>
            </v-btn>
            <v-btn fab dark small color="red">
              <v-icon>mdi-delete</v-icon>
            </v-btn>
          </v-speed-dial>
        </v-toolbar>
      </template>
      <v-divider></v-divider>
      <v-list dense>
        <v-list-item-group v-model="selectedField">
          <v-list-item v-for="(field, index) in formObject.fields" :key="index">
            <v-list-item-action class="mr-2">
              <v-checkbox
                dense
                :true-value="index + 1"
                :false-value="-(index + 1)"
                @change="selectChange"
              ></v-checkbox>
            </v-list-item-action>
            <v-list-item-action class="mx-2">
              <v-icon>mdi-form-dropdown</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>{{ field.label }}</v-list-item-title>
            </v-list-item-content>
            <v-list-item-action>
              <v-btn
                icon
                outlined
                x-small
                v-if="index != 0"
                @click.native="fieldUp(index)"
              >
                <v-icon>mdi-arrow-up</v-icon>
              </v-btn>
            </v-list-item-action>
            <v-list-item-action class="ml-0">
              <v-btn
                icon
                outlined
                x-small
                v-if="index != fieldCount - 1"
                @click.native="fieldDown(index)"
              >
                <v-icon>mdi-arrow-down</v-icon>
              </v-btn>
            </v-list-item-action>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>

    <v-card flat tile class="grow">
      <v-card-title class="justify-center">{{ formObject.title }}</v-card-title>
      <v-card-subtitle class="text-center">{{
        formObject.subtitle
      }}</v-card-subtitle>
      <v-card-text>
        <v-row>
          <v-col
            cols="12"
            v-for="(field, index) in formObject.fields"
            :key="index"
            :md="field.cols"
          >
            <v-hover v-slot="{ hover }" :disabled="!fieldReveal">
              <v-card
                flat
                @click.native="selectItem(index)"
                elevation="0"
                :ripple="fieldReveal ? { class: 'primary--text' } : false"
              >
                <div v-if="hover && fieldReveal" class="hover-reveal" />
                <v-text-field
                  dense
                  :label="field.label"
                  v-if="field.type == 'text-field'"
                ></v-text-field>
                <v-text-field
                  dense
                  :label="field.label"
                  v-if="field.type == 'text-field1'"
                ></v-text-field>
              </v-card>
            </v-hover>
          </v-col>
        </v-row>
        <v-fab-transition>
          <v-btn
            class="mt-8"
            color="pink"
            fab
            dark
            small
            absolute
            top
            right
            @click.stop="toggleDrawer"
          >
            <v-icon>mdi-fullscreen{{ `${showDrawer ? "" : "-exit"}` }}</v-icon>
          </v-btn>
        </v-fab-transition>
      </v-card-text>
      <v-card-actions>
        <v-btn
          text
          :color="fieldReveal ? 'primary' : 'error'"
          @click="testMode"
        >
          {{ fieldReveal ? "表单测试" : "停止测试" }}
        </v-btn>
        <v-spacer />
        <v-btn v-if="!fieldReveal" text color="primary"> 提交 </v-btn>
      </v-card-actions>
    </v-card>

    <v-navigation-drawer
      right
      v-model="showDrawer"
      :width="showDrawer ? 256 : 0"
    >
      <v-expansion-panels
        v-model="panel"
        flat
        tile
        accordion
        focusable
        style="margin: 0 1px"
      >
        <v-expansion-panel>
          <v-expansion-panel-header> 字段属性 </v-expansion-panel-header>
          <v-expansion-panel-content>
            <v-text-field
              class="mt-4"
              label="字段名称"
              outlined
              dense
              value="姓名"
            ></v-text-field>
            <v-slider label="字段宽度" thumb-label min="1" max="12"> </v-slider>
          </v-expansion-panel-content>
        </v-expansion-panel>
        <v-expansion-panel>
          <v-expansion-panel-header> 表单验证 </v-expansion-panel-header>
          <v-expansion-panel-content>
            <v-subheader>内置规则</v-subheader>
            <v-chip-group
              active-class="primary--text"
              column
              multiple
              v-model="selectedRules"
            >
              <v-chip outlined filter small v-for="rule in rules" :key="rule.label">
                {{ rule.label }}
              </v-chip>
            </v-chip-group>
          </v-expansion-panel-content>
        </v-expansion-panel>
        <v-expansion-panel>
          <v-expansion-panel-header> 数据来源 </v-expansion-panel-header>
          <v-expansion-panel-content>
            <v-select :items="links" label="类型"></v-select>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
    </v-navigation-drawer>
  </v-container>
</template>
<script>
export default {
  data: () => ({
    items: [
      { title: "Home", icon: "mdi-view-dashboard" },
      { title: "About", icon: "mdi-forum" },
    ],
    links: ["Home", "Contacts", "Settings"],
    mini: true,

    showDrawer: true,
    panel: 0,
    fab: false,
    fieldReveal: true,
    selectedField: undefined,
    batchFields: [],
    formJson: `{
      "title": "This is a form",
      "subtitle": "v1.0",
      "fields": [
        { "label": "姓名", "type": "text-field", "cols": "4" },
        { "label": "性别", "type": "text-field", "cols": "4" },
        { "label": "电话", "type": "text-field", "cols": "4" },
        { "label": "居住地址", "type": "text-field", "cols": "8" }
      ]
    }`,
    formObject: null,
    rules: [{ label: "必填" }, { label: "电话号码" }, { label: "电子邮件" }],
    selectedRules: [0],
  }),
  created() {
    this.formObject = JSON.parse(this.formJson);
  },
  computed: {
    fieldCount: function () {
      return this.formObject.fields.length;
    },
  },
  watch: {
    selectedField: function (val) {
      // console.log('select chang to ' + val)
    },
  },
  methods: {
    toggleDrawer() {
      this.showDrawer = !this.showDrawer;
    },
    selectChange(v) {
      const id = parseInt(v);
      if (isNaN(id)) return;
      if (id > 0) {
        this.batchFields.push(id);
      } else if (id < 0) {
        this.batchFields = this.batchFields.filter(function (el) {
          return el != -id;
        });
      }
    },
    selectItem(index) {
      this.selectedField = index;
    },
    fieldUp(i) {
      if (i <= 0) return;
      [this.formObject.fields[i - 1], this.formObject.fields[i]] = [
        this.formObject.fields[i],
        this.formObject.fields[i - 1],
      ]; // 数组开头语句前面不能省略分号
      this.$set(this.formObject.fields, i, this.formObject.fields[i]); //手动set才能引起vue刷新列表
      this.selectedField = i - 1;
    },
    fieldDown(i) {
      if (i >= this.fieldCount - 1) return;
      [this.formObject.fields[i], this.formObject.fields[i + 1]] = [
        this.formObject.fields[i + 1],
        this.formObject.fields[i],
      ];
      this.$set(this.formObject.fields, i, this.formObject.fields[i]);
      this.selectedField = i + 1;
    },
    testMode() {
      this.fieldReveal = !this.fieldReveal;
    },
  },
};
</script>
<style scoped>
.hover-reveal {
  position: absolute;
  z-index: 1;
  opacity: 0;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
}
</style>