<template>
    <LRow>
        <v-text-field outline :label="varName" :value="varValue" @input="$emit('input', $event)"> </v-text-field>
        <!-- <v-btn class="xs6" round color="info" block=true>
            <font color="back" style="bold">
                {{ varName }}
            </font>
        </v-btn>
        <v-btn class="xs6" round color="warning" block=true>
            {{ varValue }}
        </v-btn>
        -->
        <v-btn color="error" icon @click="$emit('click_deletion')">
            <v-icon>
                delete
            </v-icon>
        </v-btn> 
    </LRow>
</template>

<script>
export default {
    name: "BoiteVariable",
    props: {
        varName: {
            type: String,
            required: true,
            validator (value) {
                return true;
            }
        },
        varValue: {
            required: true,
        }
    },
    event: 'click_deletion'
}
</script>
